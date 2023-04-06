import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces/product';

const ProductSchema = new Schema(
	{
		description: { type: String, required: true },
		images: [{ type: String }],
		inStock: { type: Number, required: true, default: 0 },
		price: { type: Number, required: true, default: 0 },
		sizes: [
			{
				type: String,
				enum: {
					values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
					message: '{VALUE} is not valid'
				}
			}
		],
		slug: { type: String, required: true, unique: true },
		tags: [{ type: String }],
		title: { type: String, required: true },
		type: [
			{
				type: String,
				enum: {
					values: ['shirts', 'pants', 'hoodies', 'hats'],
					message: '{VALUE} is not valid'
				}
			}
		],
		gender: [
			{
				type: String,
				enum: {
					values: ['men', 'women', 'kid', 'unisex'],
					message: '{VALUE} is not valid'
				}
			}
		]
	},
	{
		timestamps: true
	}
);

//TODO: Create mongo idx

const ProductModel: Model<IProduct> = mongoose.models.Product || model('Product', ProductSchema);

export default ProductModel;
