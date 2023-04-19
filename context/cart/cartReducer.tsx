import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';

type CartActionType =
	| { type: '[Cart] Add Product'; payload: ICartProduct }
	| { type: '[Cart] Update Qty'; payload: ICartProduct[] }
	| { type: '[Cart] Update Qty On Cart Product'; payload: ICartProduct[] }
	| { type: '[Cart] Delete Product From Cart'; payload: ICartProduct[] }
	| { type: '[Cart] Get Products From Cookies'; payload: ICartProduct[] }
	| {
			type: '[Cart] Update Summary Info';
			payload: {
				productsQty: number;
				subTotal: number;
				taxes: number;
				total: number;
			};
	  };

const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] Get Products From Cookies':
			return {
				...state,
				cart: action.payload
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

		case '[Cart] Update Qty On Cart Product':
			return {
				...state,
				cart: action.payload
			};

		case '[Cart] Delete Product From Cart':
			return {
				...state,
				cart: action.payload
			};

		case '[Cart] Update Summary Info':
			return {
				...state,
				...action.payload
			};

		default:
			return state;
	}
};

export default cartReducer;
