import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { UserModel } from '../../../../models';
import { verifyToken, createJwt } from '../../../../utils';

type Data =
	| { message: string }
	| {
			token: string;
			user: {
				id: string;
				name: string;
				email: string;
				role: string;
			};
	  };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return validateToken(req, res);

		default:
			return res.status(200).json({ message: 'Bad Request' });
	}
}

async function validateToken(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { token = '' } = req.cookies as { token: string };

	let userId = '';

	try {
		userId = await verifyToken(token);
	} catch (error) {
		return res.status(401).json({ message: '[API] Token is not valid' });
	}

	db.connect();
	const user = await UserModel.findById(userId).lean();
	db.disconnect();

	if (!user) return res.status(400).json({ message: 'ID not exist' });

	const newToken = createJwt(userId);

	return res.status(200).json({
		token: newToken,
		user: {
			id: userId,
			name: user.name,
			email: user.email,
			role: user.role
		}
	});
}
