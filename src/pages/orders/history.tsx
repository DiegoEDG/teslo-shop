import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../../components/layout';
import { verifyToken } from '../../../utils';
import { getOrdersByUserId } from '../../../database';
import { IOrder } from '../../../interfaces';
import { FC } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { token } = req.cookies;

	if (!token) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/history`,
				permanent: false
			}
		};
	}

	const userId = await verifyToken(token!);
	const orders = await getOrdersByUserId(userId);

	const rows = orders.map((order: IOrder, idx: number) => ({
		id: idx + 1,
		paid: order.isPaid,
		fullname: `${order.addressInfo.firstName} ${order.addressInfo.lastName}`,
		orderId: order._id
	}));

	return {
		props: {
			rows
		}
	};
};

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'fullname', headerName: 'Name', width: 300 },

	{
		field: 'paid',
		headerName: 'Paid',
		width: 200,
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? (
				<Chip color="success" label="Paid" variant="outlined" />
			) : (
				<Chip color="error" label="No paid" variant="outlined" />
			);
		}
	},
	{
		field: 'orden',
		headerName: 'See order',
		width: 200,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return (
				<NextLink href={`/orders/${params.row.orderId}`} style={{ color: '#fcdab7' }}>
					See order
				</NextLink>
			);
		}
	}
];

interface Props {
	rows: [];
}

const HistoryPage: FC<Props> = ({ rows }) => {
	return (
		<ShopLayout title={'Orders History'} pageDescription={'Client Order History'}>
			<Typography variant="h1" component="h1" mb={3}>
				Order History
			</Typography>

			<Grid container>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSizeOptions={[100]} style={{ border: '1px solid #fcdab7' }} />
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default HistoryPage;
