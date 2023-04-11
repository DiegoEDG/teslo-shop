import { FC, PropsWithChildren, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import cartReducer from './cartReducer';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: []
};

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	return <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>;
};

export default CartProvider;