import { createContext } from 'react';
import { IUser } from '../../interfaces';
import { PayloadUser } from './AuthProvider';

export interface AuthContextProps {
	isLoggedIn: boolean;
	userData?: IUser;
	// Methods
	logIn: (userData: PayloadUser) => Promise<boolean>;
	registerCtx: (userData: PayloadUser) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextProps);
