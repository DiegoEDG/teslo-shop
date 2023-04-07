import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import uiReducer from './uiReducer';

export interface UIState {
	isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
	isMenuOpen: false
};

const UIProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const toggleMenu = () => {
		dispatch({ type: '[UI] Toggle Menu' });
	};

	return (
		<UIContext.Provider
			value={{
				...state,
				// Methods
				toggleMenu
			}}
		>
			{children}
		</UIContext.Provider>
	);
};

export default UIProvider;
