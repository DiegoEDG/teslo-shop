import { createContext } from 'react';
import { UserLoggedIn } from '../../interfaces';
import { PayloadUser } from './AuthProvider';

export interface AuthContextProps {
	isLoggedIn: boolean;
	userData?: UserLoggedIn;
	// Methods
	logIn: (userData: PayloadUser) => Promise<boolean>;
	registerCtx: (userData: PayloadUser) => Promise<boolean>;
	logOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
