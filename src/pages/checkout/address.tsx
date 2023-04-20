import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { ShopLayout } from '../../../components/layout';
import { IAddressInfo } from '../../../interfaces';
import { countries } from '../../../utils';
import { useContext } from 'react';
import { CartContext } from '../../../context';

const AddressPage = () => {
	const { addressInfo, updateAddressInfo } = useContext(CartContext);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IAddressInfo>({
		defaultValues: addressInfo
	});

	const onCheckout = (data: IAddressInfo) => {
		Cookies.set('addressInfo', JSON.stringify(data));
		updateAddressInfo(data);
	};

	return (
		<ShopLayout title="Checkout | Address" pageDescription="Confirmar dirección del destino">
			<Typography variant="h1" component="h1">
				Address
			</Typography>

			<form onSubmit={handleSubmit(onCheckout)}>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="First Name"
							variant="filled"
							fullWidth
							// value={formValues.firstName}
							{...register('firstName', {
								required: 'First Name is required'
							})}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Last Name"
							variant="filled"
							fullWidth
							{...register('lastName', {
								required: 'Last Name is required'
							})}
							error={!!errors.lastName}
							helperText={errors.lastName?.message}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							label="Address 1"
							variant="filled"
							fullWidth
							{...register('address1', {
								required: 'Address 1 is required',
								minLength: { value: 5, message: 'Address 1 must be at least 5 characters' }
							})}
							error={!!errors.address1}
							helperText={errors.address1?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Address 2 (optional)" variant="filled" fullWidth {...register('address2')} />
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							label="CP"
							variant="filled"
							fullWidth
							{...register('zipCode', {
								required: 'Zip Code is required'
							})}
							error={!!errors.zipCode}
							helperText={errors.zipCode?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="City"
							variant="filled"
							fullWidth
							{...register('city', {
								required: 'City is required'
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								select
								variant="filled"
								label="Country"
								defaultValue="MEX"
								{...register('country', {
									required: 'Country is required'
								})}
								error={!!errors.country}
								helperText={errors.phone?.message}
							>
								{countries.map((country) => (
									<MenuItem key={country.code} value={country.code}>
										{country.name}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Phone Number"
							variant="filled"
							fullWidth
							{...register('phone', {
								required: 'Phone is required'
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>

				<Box sx={{ mt: 5 }} display="flex" justifyContent="center">
					<Button color="primary" className="circular-btn" size="large" type="submit">
						Check Order
					</Button>
				</Box>
			</form>
		</ShopLayout>
	);
};

export default AddressPage;
