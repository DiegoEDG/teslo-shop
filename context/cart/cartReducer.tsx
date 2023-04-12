import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';

type CartActionType =
	| { type: '[Cart] Get Products'; payload: ICartProduct[] }
	| { type: '[Cart] Add Product'; payload: ICartProduct }
	| { type: '[Cart] Update Qty'; payload: ICartProduct[] };

const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] Get Products':
			return {
				...state
			};

		case '[Cart] Add Product':
			return {
				...state,
				cart: [...state.cart, action.payload]
			};

		case '[Cart] Update Qty':
			return {
				...state,
				cart: action.payload
			};

		default:
			return state;
	}
};

export default cartReducer;
