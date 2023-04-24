import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';
import { CartList, OrderSummary } from '../../../components/cart';
import { CartContext } from '../../../context/cart/CartContext';
import { Loading } from '../../../components/ui';
import Cookies from 'js-cookie';

const SummaryPage = () => {
	const { cart, productsQty, addressInfo } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		const cartInCookies = Cookies.get('cart');
		if (!cartInCookies) {
			router.replace('/cart/empty');
		}
	}, [cart]);

	if (cart.length === 0) {
		return <Loading />;
	}

	const onConfirm = () => {
		console.log({ cart, addressInfo });
	};

	return (
		<ShopLayout title="Order Summary" pageDescription={'Order Summary'}>
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

							{!addressInfo?.address1 ? (
								<>
									<Typography variant="h6">Delivery Address missing</Typography>
									<NextLink href="/checkout/address" style={{ color: '#fcdab7' }}>
										Please add an Address
									</NextLink>
								</>
							) : (
								<>
									<Box display="flex" justifyContent="space-between">
										<Typography variant="subtitle1">Delivery address</Typography>

										<NextLink href="/checkout/address" style={{ color: '#fcdab7' }}>
											Edit
										</NextLink>
									</Box>

									<Typography>{`${addressInfo.firstName} ${addressInfo.lastName}`}</Typography>
									<Typography>{`${addressInfo.address1} ${addressInfo.address2} - ${addressInfo.zipCode}`}</Typography>
									<Typography>{`${addressInfo.city}, ${addressInfo.country}`}</Typography>
									<Typography>{addressInfo.phone}</Typography>
								</>
							)}

							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="end">
								<NextLink href="/cart" style={{ color: '#fcdab7' }}>
									Edit
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								{addressInfo?.address1 && (
									<Button color="secondary" className="circular-btn" fullWidth onClick={onConfirm}>
										Confirm Orden
									</Button>
								)}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
