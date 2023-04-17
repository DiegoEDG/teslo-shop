import jwt from 'jsonwebtoken';

export const createJwt = (id: string) => {
	if (!process.env.JWT_SIGN) {
		console.log('Secret was not provided, please check the .env .JWT_SIGN environment variable');
	}

	const token = jwt.sign(
		// payload
		{ id },
		// sign
		process.env.JWT_SIGN!,
		// options
		{ expiresIn: '30d' }
	);

	return token;
};

export const verifyToken = (token: string): Promise<string> => {
	if (!process.env.JWT_SIGN) {
		console.log('Secret was not provided, please check the .env .JWT_SIGN environment variable');
	}

	return new Promise((resolve, reject) => {
		try {
			jwt.verify(token, process.env.JWT_SIGN || '', (err, payload) => {
				if (err) return reject('[VERIFY] Token is not valid');

				const { id } = payload as { id: string };
				resolve(id);
			});
		} catch (error) {
			return reject('[ERROR] Token is not valid');
		}
	});
};
