import { db } from '.';
import { OrderModel } from '../models';

export const getOrderById = async (id: string) => {
	db.connect();
	const order = await OrderModel.findById(id).lean();
	db.disconnect();

	if (!order) {
		return null;
	}

	return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUserId = async (id: string) => {
	db.connect();
	const orders = await OrderModel.find({ user: id }).lean();
	db.disconnect();

	if (!orders) {
		return null;
	}

	return JSON.parse(JSON.stringify(orders));
};
