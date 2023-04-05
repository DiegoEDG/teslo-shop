import NextLink from 'next/link';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layout';

const RegisterPage = () => {
	return (
		<AuthLayout title={'Ingresar'}>
			<Box sx={{ width: 600, padding: '10px 20px' }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h1" component="h1">
							Create an account
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<TextField label="Name" variant="filled" fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Email" variant="filled" fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Password" type="password" variant="filled" fullWidth />
					</Grid>

					<Grid item xs={12}>
						<Button color="secondary" className="circular-btn" size="large" fullWidth>
							Sign Up
						</Button>
					</Grid>

					<Grid item xs={12} display="flex" justifyContent="end">
						<NextLink href="/auth/login">Already have an account?</NextLink>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};

export default RegisterPage;
