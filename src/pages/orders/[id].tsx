import NextLink from 'next/link';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../../components/layout';
import { CartList, OrderSummary } from '../../../components/cart';

const OrderPage = () => {
	return (
		<ShopLayout title="Order 123671523" pageDescription={'Resumen de la orden'}>
			<Typography variant="h1" component="h1">
				Order: ABC123
			</Typography>

			{/* <Chip 
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant='outlined'
            color="error"
            icon={ <CreditCardOffOutlined /> }
        /> */}
			<Chip sx={{ my: 2 }} label="Order paid" variant="outlined" color="success" icon={<CreditScoreOutlined />} />

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">Summary (3 products)</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Delivery address</Typography>
								<NextLink href="/checkout/address">Edit</NextLink>
							</Box>

							<Typography>Fernando Herrera</Typography>
							<Typography>323 Algun lugar</Typography>
							<Typography>Stittsville, HYA 23S</Typography>
							<Typography>Canadá</Typography>
							<Typography>+1 23123123</Typography>

							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="end">
								<NextLink href="/cart" passHref>
									Edit
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								{/* TODO */}
								<h1>Pay</h1>

								<Chip
									sx={{ my: 2 }}
									label="Order Paid"
									variant="outlined"
									color="success"
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default OrderPage;
