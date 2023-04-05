import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';

const AddressPage = () => {
	return (
		<ShopLayout title="Checkout | Address" pageDescription="Confirmar dirección del destino">
			<Typography variant="h1" component="h1">
				Address
			</Typography>

			<Grid container spacing={2} sx={{ mt: 2 }}>
				<Grid item xs={12} sm={6}>
					<TextField label="First Name" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Last Name" variant="filled" fullWidth />
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField label="Address 1" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Address 2 (optional)" variant="filled" fullWidth />
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField label="CP" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="City" variant="filled" fullWidth />
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Select variant="filled" label="Country" value={1}>
							<MenuItem value={1}>Costa Rica</MenuItem>
							<MenuItem value={2}>Honduras</MenuItem>
							<MenuItem value={3}>El Salvador</MenuItem>
							<MenuItem value={4}>México</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Phone Number" variant="filled" fullWidth />
				</Grid>
			</Grid>

			<Box sx={{ mt: 5 }} display="flex" justifyContent="center">
				<Button color="primary" className="circular-btn" size="large">
					Check Order
				</Button>
			</Box>
		</ShopLayout>
	);
};

export default AddressPage;
