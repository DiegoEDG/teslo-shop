import { createContext } from 'react';
import { IAddressInfo, ICartProduct, IOrder } from '../../interfaces';

export interface CartContextProps {
	addressInfo?: IAddressInfo;
	cart: ICartProduct[];
	productsQty: number;
	subTotal: number;
	taxes: number;
	total: number;
	addProduct: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	deleteCartProduct: (product: ICartProduct) => void;
	updateAddressInfo: (addressInfo: IAddressInfo) => void;
	createOrder: (token: any) => Promise<IOrder | null>;
}

export const CartContext = createContext({} as CartContextProps);
