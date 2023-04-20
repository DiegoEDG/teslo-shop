import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';
import { CartList, OrderSummary } from '../../../components/cart';
import { CartContext } from '../../../context/cart/CartContext';
import { Loading } from '../../../components/ui';
import Link from 'next/link';

const SummaryPage = () => {
	const { cart, productsQty } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (cart.length === 0) {
			router.replace('/cart/empty');
		}
	}, [cart]);

	if (cart.length === 0) {
		return <Loading />;
	}

	return (
		<ShopLayout title="Order Summary" pageDescription={'Resumen de la orden'}>
			<Typography variant="h1" component="h1" mb={3}>
				Order Summary
			</Typography>

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">
								{productsQty > 1 ? `${productsQty} Products` : `${productsQty} Product`}
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Delivery address</Typography>
								<NextLink href="/checkout/address" style={{ color: '#fcdab7' }}>
									Edit
								</NextLink>
							</Box>

							<Typography>Fernando Herrera</Typography>
							<Typography>323 Algun lugar</Typography>
							<Typography>Stittsville, HYA 23S</Typography>
							<Typography>Canadá</Typography>
							<Typography>+1 23123123</Typography>

							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="end">
								<NextLink href="/cart" style={{ color: '#fcdab7' }}>
									Edit
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<Link href="/checkout/address" style={{ textDecoration: 'none' }}>
									<Button color="secondary" className="circular-btn" fullWidth>
										Confirm Orden
									</Button>
								</Link>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
