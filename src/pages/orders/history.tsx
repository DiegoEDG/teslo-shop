import NextLink from 'next/link';

import { Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../../components/layout';

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
				<NextLink href={`/orders/${params.row.id}`} style={{ color: '#fcdab7' }}>
					See order
				</NextLink>
			);
		}
	}
];

const rows = [
	{ id: 1, paid: true, fullname: 'Fernando Herrera' },
	{ id: 2, paid: false, fullname: 'Melissa Flores' },
	{ id: 3, paid: true, fullname: 'Hernando Vallejo' },
	{ id: 4, paid: false, fullname: 'Emin Reyes' },
	{ id: 5, paid: false, fullname: 'Eduardo Rios' },
	{ id: 6, paid: true, fullname: 'Natalia Herrera' }
];

const HistoryPage = () => {
	return (
		<ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
			<Typography variant="h1" component="h1" mb={3}>
				Order History
			</Typography>

			<Grid container>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSizeOptions={[10]} style={{ border: '1px solid #fcdab7' }} />
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default HistoryPage;