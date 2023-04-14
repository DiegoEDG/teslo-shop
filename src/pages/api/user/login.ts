import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { UserModel } from '../../../../models';
import bcrypt from 'bcryptjs';

type Data =
	| { message: string }
	| {
			token: string;
			user: {
				name: string;
				email: string;
				role: string;
			};
	  };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return authUser(req, res);

		default:
			return res.status(200).json({ message: 'Example' });
	}
}

async function authUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { email = '', password = '' } = req.body;

	db.connect();
	const user = await UserModel.findOne({ email });
	db.disconnect();

	if (!user) return res.status(404).json({ message: 'Email or password not found - EMAIL' });

	if (!bcrypt.compareSync(password, user.password!))
		return res.status(200).json({ message: 'Email or password not found - PASSWORD' });

	return res.status(200).json({
		token: '',
		user: {
			name: user.name,
			email: user.email,
			role: user.role
		}
	});
}
