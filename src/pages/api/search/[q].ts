import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import ProductModel from '../../../../models/ProductModel';
import { IProduct } from '../../../../interfaces/product';

type Data = { message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProductsBySearch(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const getProductsBySearch = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	let { q = '' } = req.query;

	if (q.length === 0) {
		return res.status(404).json({ message: 'Search is empty' });
	}

	q = q.toString().toLowerCase();

	db.connect();
	const products = await ProductModel.find({ $text: { $search: q } })
		.select('title slug inStock price images -_id')
		.lean();
	db.disconnect();

	return res.status(200).json(products);
};
