import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { ProductModel, OrderModel } from '../../../../models';
import { ICartProduct, IOrder } from '../../../../interfaces';

type Data = { message: string } | IOrder;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return saveOrder(req, res);

		default:
			return res.status(400).json({ message: '[Orders API] Bad Request' });
	}
}

async function saveOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { user = '', orderItems, total } = req.body;

	const orderItemsIds = orderItems.map((prod: ICartProduct) => prod._id);

	if (!user) return res.status(400).json({ message: '[Orders API] User unauthenticated' });

	try {
		db.connect();
		const productsFromDB = await ProductModel.find({ _id: { $in: orderItemsIds } });

		const subTotalFromDB = orderItems.reduce((prev: number, current: ICartProduct) => {
			const currentPrice = productsFromDB.find((prod) => prod.id === current._id)?.price;
			if (!currentPrice) {
				throw new Error('[Orders Api] Product not found');
			}

			return currentPrice * current.quantity + prev;
		}, 0);

		const totalfromDB = subTotalFromDB * 0.15 + subTotalFromDB;

		if (total !== totalfromDB) {
			throw new Error('[Orders Api] Total is not correct');
		}

		const newOrder = new OrderModel({ ...req.body, isPaid: false, user });
		await newOrder.save();
		await db.disconnect();

		return res.status(201).json(newOrder);
	} catch (error: any) {
		await db.disconnect();
		console.log(error);
		res.status(400).json({
			message: error.message || '[Orders Api] Check Server Logs'
		});
	}
}
