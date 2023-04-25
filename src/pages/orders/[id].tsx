import { FC } from 'react';
import { GetServerSideProps } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../../components/layout';
import { CartList, OrderSummary } from '../../../components/cart';
import { getOrderById } from '../../../database';
import { IOrder } from '../../../interfaces';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
	const { id = '' } = query;
	const { token } = req.cookies;

	if (!token) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/${id}`,
				permanent: false
			}
		};
	}

	const order = await getOrderById(id as string);

	return {
		props: {
			order
		}
	};
};

interface Props {
	order: IOrder;
}

const OrderPage: FC<Props> = ({ order }) => {
	return (
		<ShopLayout title="Order 123671523" pageDescription={'Resumen de la orden'}>
			<Typography variant="h1" component="h1">
				Order No. {order._id?.slice(-4)}
			</Typography>

			<Chip
				sx={{ my: 2 }}
				label="Pendiente de pago"
				variant="outlined"
				color="error"
				icon={<CreditCardOffOutlined />}
			/>
			{/* <Chip sx={{ my: 2 }} label="Order paid" variant="outlined" color="success" icon={<CreditScoreOutlined />} /> */}

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList editable={false} orderProducts={order.orderItems} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">
								Summary ({order.productsQty === 1 ? `${order.productsQty} product` : `${order.productsQty} products`} )
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Delivery address</Typography>
							</Box>

							<Typography>{`${order.addressInfo.firstName} ${order.addressInfo.lastName}`}</Typography>
							<Typography>{`${order.addressInfo.address1} ${order.addressInfo.address2} - ${order.addressInfo.zipCode}`}</Typography>
							<Typography>{`${order.addressInfo.city}, ${order.addressInfo.country}`}</Typography>
							<Typography>{order.addressInfo.phone}</Typography>

							<Divider sx={{ my: 1 }} />

							<OrderSummary
								orderSummaryInfo={{
									subTotal: order.subTotal,
									taxes: order.taxes,
									total: order.total,
									productsQty: order.productsQty
								}}
							/>

							<Box sx={{ mt: 3 }}>
								{/* TODO */}
								<h1>Pay</h1>

								{/* <Chip
									sx={{ my: 2 }}
									label="Order Paid"
									variant="outlined"
									color="success"
									icon={<CreditScoreOutlined />}
								/> */}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default OrderPage;
