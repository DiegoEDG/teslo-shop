import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';

type CartActionType =
	| { type: '[Cart] Get Products'; payload: ICartProduct[] }
	| { type: '[Cart] Add Product'; payload: ICartProduct };

const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] Get Products':
			return {
				...state
			};
		default:
			return state;
	}
};

export default cartReducer;
