import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import cartReducer from './cartReducer';
import Cookie from 'js-cookie';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: []
};

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		try {
			const cookieCart = JSON.parse(Cookie.get('cart') ?? '[]');
			if (cookieCart.length > 0) dispatch({ type: '[Cart] Get Products From Cookies', payload: cookieCart });
			console.log('Getting Cookie', { cookieCart });
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		Cookie.set('cart', JSON.stringify(state.cart));
		console.log('Setting Cookie');
	}, [state.cart]);

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

	const updateCartQuantity = (product: ICartProduct) => {
		const cartUpdated = state.cart.map((productOnState) => {
			if (productOnState._id !== product._id) return productOnState;
			if (productOnState.size !== product.size) return productOnState;
			return product;
		});

		dispatch({ type: '[Cart] Update Qty On Cart Product', payload: cartUpdated });
	};

	const deleteCartProduct = (product: ICartProduct) => {
		const cartUpdated = state.cart.filter(
			(productInCart) => productInCart._id === product._id && productInCart.size === product.size
		);
		console.log(cartUpdated);

		dispatch({ type: '[Cart] Delete Product From Cart', payload: cartUpdated });
	};

	return (
		<CartContext.Provider value={{ ...state, addProduct, updateCartQuantity, deleteCartProduct }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
