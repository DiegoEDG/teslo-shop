import NextLink from 'next/link';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layout';

const LoginPage = () => {
	return (
		<AuthLayout title={'Ingresar'}>
			<Box sx={{ width: 600, padding: '10px 20px' }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h1" component="h1">
							Login
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<TextField label="Email" variant="filled" fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Password" type="password" variant="filled" fullWidth />
					</Grid>

					<Grid item xs={12}>
						<Button color="primary" className="circular-btn" size="large" fullWidth>
							Log In
						</Button>
					</Grid>

					<Grid item xs={12} display="flex" justifyContent="end">
						<NextLink href="/auth/register">Does´t have an account?</NextLink>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};

export default LoginPage;
