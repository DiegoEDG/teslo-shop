import { AuthState } from './AuthProvider';
import { UserLoggedIn } from '../../interfaces/IUser';

type AuthActionType =
	| { type: '[Auth] Login'; payload: UserLoggedIn }
	| { type: '[Auth] Logout' }
	| { type: '[Auth] Revalidate User'; payload: UserLoggedIn };

const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
	switch (action.type) {
		case '[Auth] Login':
			return {
				...state,
				isLoggedIn: true,
				userData: action.payload
			};

		case '[Auth] Logout':
			return {
				...state,
				isLoggedIn: false,
				userData: undefined
			};

		case '[Auth] Revalidate User':
			return {
				...state,
				isLoggedIn: true,
				userData: action.payload
			};
		default:
			return state;
	}
};

export default authReducer;
