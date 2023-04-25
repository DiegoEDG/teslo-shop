export interface IUser {
	_id: string;
	name: string;
	email: string;
	password?: string;
	role: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserLoggedIn {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}
