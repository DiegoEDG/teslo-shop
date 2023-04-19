import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layout';
import { isEmail } from '../../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../../context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const [showError, setShowError] = useState(false);
	const { logIn, userData } = useContext(AuthContext);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();

	const onLogin = async (formData: FormData) => {
		setShowError(false);

		const isLoggedIn = await logIn(formData);

		if (!isLoggedIn) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}

		if (isLoggedIn) router.replace('/');
	};

	return (
		<AuthLayout title={'Ingresar'}>
			<form onSubmit={handleSubmit(onLogin)}>
				<Box sx={{ width: 600, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h1" component="h1">
								Login
							</Typography>
							<Chip
								label="Email or password not valid"
								color="error"
								icon={<ErrorOutline />}
								className="fadeIn"
								sx={{ display: showError ? 'flex' : 'none', marginTop: '10px', paddingY: '25px' }}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								label="Email"
								variant="filled"
								fullWidth
								{...register('email', {
									required: 'Email is required',
									validate: isEmail
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Password"
								type="password"
								variant="filled"
								fullWidth
								{...register('password', {
									required: 'Password is required',
									minLength: { value: 6, message: 'Password must be at least 6 characters' }
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button color="primary" className="circular-btn" size="large" fullWidth type="submit">
								Log In
							</Button>
						</Grid>

						<Grid item xs={12} display="flex" justifyContent="end">
							<NextLink href="/auth/register">Does´t have an account?</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
