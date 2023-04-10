import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';
import { ProductSlideshow, SizeSelector } from '../../../components/products';
import { ItemCounter } from '../../../components/ui';
import { IProduct } from '../../../interfaces';
import { getProductBySlug, getSlugProducts } from '../../../database';
import { Paragliding } from '@mui/icons-material';

interface Props {
	product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
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
							/>
						</Box>

						{/* Agregar al carrito */}
						<Button color="primary" className="circular-btn">
							Add to cart
						</Button>

						{/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

						{/* Descripción */}
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
	console.log(slugs);
	const slugPaths = slugs.map(({ slug }) => ({
		params: { slug }
	}));
	console.log(slugPaths);

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
