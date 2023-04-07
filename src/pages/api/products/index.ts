import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import ProductModel from '../../../../models/ProductModel';
import { IProduct } from '../../../../interfaces/product';
import { PRODUCT_CONSTANTS } from '../../../../interfaces';

type Data = { message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { gender = 'all' } = req.query;
	let condition = {};

	if (gender !== 'all' && PRODUCT_CONSTANTS.GENDERS.includes(`${gender}`)) {
		condition = { gender };
	}

	db.connect();
	const products = await ProductModel.find(condition).select('title slug inStock price images -_id').lean();
	db.disconnect();
	res.status(200).json(products);
};
