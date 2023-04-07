import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import ProductModel from '../../../../models/ProductModel';
import { IProduct } from '../../../../interfaces/product';

type Data = { message: string } | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProductBySlug(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { slug } = req.query;

	db.connect();
	const product = await ProductModel.findOne({ slug });
	db.disconnect();

	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}
	return res.status(200).json(product);
};
