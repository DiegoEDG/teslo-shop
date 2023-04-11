import { FC, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ICartProduct, IProduct, ISize } from '../../../interfaces';
import { ShopLayout } from '../../../components/layout';
import { ProductSlideshow, SizeSelector } from '../../../components/products';
import { ItemCounter } from '../../../components/ui';
import { getProductBySlug, getSlugProducts } from '../../../database';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

interface Props {
	product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		image: product.images[0],
		inStock: product.inStock,
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1
	});
	const selectedSizeHandler = (size: ISize) => {
		setTempCartProduct({ ...tempCartProduct, size });
	};

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3} mt={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>

				<Grid item xs={12} sm={5}>
					<Box display="flex" flexDirection="column">
						{/* titulos */}
						<Typography variant="h1" component="h1">
							{product.title}
						</Typography>
						<Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>
						{/* Cantidad */}
						<Box sx={{ my: 2 }}>
							<Typography variant="subtitle2">Quantity</Typography>
							<ItemCounter />
							<SizeSelector
								// selectedSize={ product.sizes[2] }
								sizes={product.sizes}
								selectedSize={tempCartProduct.size}
								onSelectedSize={selectedSizeHandler}
							/>
						</Box>
						{/* Add To Cart */}
						{product.inStock > 0 ? (
							tempCartProduct.size ? (
								<Button color="primary" className="circular-btn">
									Add to cart
								</Button>
							) : (
								<Chip
									label="Please select a size"
									color="error"
									variant="outlined"
									sx={{ border: '2px solid red', paddingY: '17px' }}
								/>
							)
						) : (
							<Chip
								label="Out Of Stock"
								color="error"
								variant="outlined"
								sx={{ border: '2px solid red', paddingY: '17px' }}
							/>
						)}
						<Box sx={{ mt: 3 }}>
							<Typography variant="subtitle2">Description</Typography>
							<Typography variant="body2">{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const slugs = await getSlugProducts();
	const slugPaths = slugs.map(({ slug }) => ({
		params: { slug }
	}));

	return {
		paths: slugPaths,
		fallback: 'blocking'
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { slug } = ctx.params as { slug: string };

	const product = await getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {
			product
		},
		revalidate: 60 * 60 * 24
	};
};

export default ProductPage;
