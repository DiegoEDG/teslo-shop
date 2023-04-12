import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

export interface CartContextProps {
	cart: ICartProduct[];
	addProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);
