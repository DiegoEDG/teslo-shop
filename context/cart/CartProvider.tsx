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
		const productToUpdateQty = state.cart.find(
			(productOnCart) => productOnCart._id === product._id && productOnCart.size === product.size
		);
		if (productToUpdateQty) {
			const productQtyUpdated = { ...productToUpdateQty, quantity: productToUpdateQty.quantity + 1 };
			dispatch({ type: '[Cart] Update Qty', payload: productQtyUpdated });
		} else {
			dispatch({ type: '[Cart] Add Product', payload: product });
		}
	};

	return <CartContext.Provider value={{ ...state, addProduct }}>{children}</CartContext.Provider>;
};

export default CartProvider;
