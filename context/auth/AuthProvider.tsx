import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { tesloApi } from '../../api';
import { UserLoggedIn } from '../../interfaces';
import { AuthContext } from './AuthContext';
import authReducer from './authReducer';
import Cookies from 'js-cookie';

export interface AuthState {
	isLoggedIn: boolean;
	userData?: UserLoggedIn;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	userData: undefined
};

export type PayloadUser = {
	name?: string;
	email: string;
	password: string;
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const router = useRouter();

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		if (Cookies.get('token')) {
			try {
				const res = await tesloApi.get('/user/validate-token');
				Cookies.set('token', res.data.token);
				dispatch({ type: '[Auth] Revalidate User', payload: res.data });
			} catch (error) {
				dispatch({ type: '[Auth] Logout' });
			}
		}
	};

	const logIn = async (userData: PayloadUser): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post('/user/login', userData);
			if (data.token) {
				Cookies.set('token', data.token);
				dispatch({ type: '[Auth] Login', payload: data });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const registerCtx = async (userData: PayloadUser): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post('/user/register', userData);
			console.log('register provider fn', data);
			if (data.token) {
				Cookies.set('token', data.token);
				dispatch({ type: '[Auth] Login', payload: data });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const logOut = () => {
		Cookies.remove('token');
		Cookies.remove('cart');
		dispatch({ type: '[Auth] Logout' });
		router.reload();
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				// Methods
				logIn,
				registerCtx,
				logOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
