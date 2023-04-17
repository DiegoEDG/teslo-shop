import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { UserModel } from '../../../../models';
import bcrypt from 'bcryptjs';
import { createJwt, isValidEmail } from '../../../../utils';

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
			return registerUser(req, res);

		default:
			return res.status(200).json({ message: 'Example' });
	}
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { email = '', password = '', name = '' } = req.body as { email: string; password: string; name: string };

	db.connect();
	const user = await UserModel.findOne({ email });

	if (user) {
		db.disconnect();
		return res.status(400).json({ message: 'Email is already registereds' });
	}

	if (!isValidEmail(email)) {
		return res.status(400).json({ message: 'Email is not valid' });
	}

	if (name.length < 3) {
		return res.status(400).json({ message: 'Name must be at least 3 characters' });
	}

	if (password.length < 6) {
		return res.status(400).json({ message: 'Password must be at least 6 characters' });
	}

	const newUser = new UserModel({
		email: email.toLocaleLowerCase(),
		password: bcrypt.hashSync(password),
		role: 'client',
		name
	});

	try {
		await newUser.save();
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Something went wrong, pleas check server error' });
	}

	const token = createJwt(newUser._id);

	return res.status(200).json({
		token,
		user: {
			name: newUser.name,
			email: newUser.email,
			role: newUser.role
		}
	});
}
