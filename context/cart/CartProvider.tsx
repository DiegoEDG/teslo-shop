import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { ICartProduct, ISummaryInfo } from '../../interfaces';
import { CartContext } from './CartContext';
import cartReducer from './cartReducer';
import Cookie from 'js-cookie';

export interface CartState {
	cart: ICartProduct[];
	productsQty: number;
	subTotal: number;
	taxes: number;
	total: number;
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
	productsQty: 0,
	subTotal: 0,
	taxes: 0,
	total: 0
};

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		try {
			const cookieCart = JSON.parse(Cookie.get('cart') ?? '[]');
			if (cookieCart.length > 0) dispatch({ type: '[Cart] Get Products From Cookies', payload: cookieCart });
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const productsQty = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
		const subTotal = state.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0);
		const taxes = subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
		const total = taxes + subTotal;

		const summaryInfo = { productsQty, subTotal, taxes, total };

		updateSummaryInfo(summaryInfo);
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
			(productInCart) => !(productInCart._id === product._id && productInCart.size === product.size)
		);

		dispatch({ type: '[Cart] Delete Product From Cart', payload: cartUpdated });
	};

	const updateSummaryInfo = (summaryInfo: ISummaryInfo) => {
		dispatch({ type: '[Cart] Update Summary Info', payload: summaryInfo });
	};

	return (
		<CartContext.Provider value={{ ...state, addProduct, updateCartQuantity, deleteCartProduct }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
