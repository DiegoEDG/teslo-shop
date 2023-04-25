import { IAddressInfo } from './IAddressInfo';
import { IUser } from './IUser';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItem[];
	addressInfo: IAddressInfo;
	paymentMethod?: string;
	productsQty: number;
	subTotal: number;
	taxes: number;
	total: number;
	isPaid: boolean;
	paidAt?: string;
}

export interface IOrderItem {
	_id: string;
	title: string;
	size: string;
	quantity: number;
	slug: string;
	image: string;
	price: number;
}
