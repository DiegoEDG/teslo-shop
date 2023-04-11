import { db } from '.';
import ProductModel from '../models/ProductModel';
import { IProduct } from '../interfaces/product';

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
	db.connect();
	const product = await ProductModel.findOne({ slug }).lean();
	db.disconnect();

	if (!product) {
		return null;
	}

	return JSON.parse(JSON.stringify(product));
};

export const getSlugProducts = async () => {
	db.connect();
	const slugs = await ProductModel.find().select('slug -_id').lean();
	db.disconnect();

	return slugs;
};

export const getProductBySearch = async (query: string) => {
	db.connect();
	const products = await ProductModel.find({ $text: { $search: query } }).lean();
	db.disconnect();

	return JSON.parse(JSON.stringify(products));
};
