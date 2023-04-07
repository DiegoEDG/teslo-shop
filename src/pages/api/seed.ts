import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import ProductModel from '../../../models/ProductModel';
import { initialData } from '../../../database/products';

type Data = {
	message: string;
};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
	if (process.env.NODE_ENV === 'production') {
		res.status(401).json({ message: 'API not available on production' });
	}

	db.connect();
	await ProductModel.deleteMany();
	await ProductModel.insertMany(initialData.products);
	db.disconnect();
	res.status(200).json({ message: 'Seed data created succesfully' });
}
