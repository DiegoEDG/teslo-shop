import { FC, useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';

interface Props {
	editable?: boolean;
	orderProducts?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable, orderProducts }) => {
	const { cart, updateCartQuantity, deleteCartProduct } = useContext(CartContext);

	const products = orderProducts ? orderProducts : cart;

	const handlerSelectedQuantity = (quantity: number, productOnCart: ICartProduct) => {
		productOnCart.quantity = quantity;
		updateCartQuantity(productOnCart);
	};

	const handleDelete = (product: ICartProduct) => {
		deleteCartProduct(product);
	};
	return (
		<>
			{products.map((product) => (
				<Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
					<Grid item xs={3}>
						{/* TODO: llevar a la página del producto */}
						<NextLink href={`/product/${product.slug}`}>
							<CardActionArea>
								<CardMedia image={`/products/${product.image}`} component="img" sx={{ borderRadius: '5px' }} />
							</CardActionArea>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display="flex" flexDirection="column">
							<Typography variant="body1">{product.title}</Typography>
							<Typography variant="body1">
								Size: <strong>{product.size}</strong>
							</Typography>

							{editable ? (
								<ItemCounter
									minValue={1}
									maxValue={product.inStock}
									onSelectedQuantity={(qty) => handlerSelectedQuantity(qty, product)}
									qtyCartProd={product.quantity}
								/>
							) : (
								<Typography variant="h5">{product.quantity} items</Typography>
							)}
						</Box>
					</Grid>
					<Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
						<Typography variant="subtitle1">{`$${product.price}`}</Typography>

						{editable && (
							<Button variant="text" color="primary" onClick={() => handleDelete(product as ICartProduct)}>
								Remove
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
