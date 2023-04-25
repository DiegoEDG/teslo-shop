import { createContext } from 'react';
import { UserLoggedIn } from '../../interfaces';

export interface AuthContextProps {
	isLoggedIn: boolean;
	userData?: UserLoggedIn;
	// Methods
	logIn: (userData: UserLoggedIn) => Promise<boolean>;
	registerCtx: (userData: UserLoggedIn) => Promise<boolean>;
	logOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
