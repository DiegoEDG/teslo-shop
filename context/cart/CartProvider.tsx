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

	const addProduct = (product: ICartProduct) => {
		const productInCart = state.cart.some((p) => p._id === product._id);
		if (!productInCart) return dispatch({ type: '[Cart] Add Product', payload: product });

		const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
		if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] Add Product', payload: product });

		// Acumular
		const updatedProducts = state.cart.map((p) => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			// Actualizar la cantidad
			p.quantity += product.quantity;
			return p;
		});

		dispatch({ type: '[Cart] Update Qty', payload: updatedProducts });
	};

	return <CartContext.Provider value={{ ...state, addProduct }}>{children}</CartContext.Provider>;
};

export default CartProvider;
