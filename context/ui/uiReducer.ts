import { UIState } from './UIProvider';

type UIActionType = { type: '[UI] Toggle Menu' };

const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case '[UI] Toggle Menu':
			return {
				...state,
				isMenuOpen: !state.isMenuOpen
			};

		default:
			return state;
	}
};

export default uiReducer;
