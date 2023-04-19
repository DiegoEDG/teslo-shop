import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

export interface CartContextProps {
	cart: ICartProduct[];
	productsQty: number;
	subTotal: number;
	taxes: number;
	total: number;
	addProduct: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	deleteCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);
