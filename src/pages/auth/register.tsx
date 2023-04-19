import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layout';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { isEmail } from '../../../utils';
import { AuthContext } from '../../../context';
import { useRouter } from 'next/router';

type FormData = {
	name: string;
	email: string;
	password: string;
};

const RegisterPage = () => {
	const [showError, setShowError] = useState(false);
	const { registerCtx } = useContext(AuthContext);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();

	const onSignUp = async (formData: FormData) => {
		setShowError(false);
		const isLoggedIn = await registerCtx(formData);

		if (!isLoggedIn) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
		}

		if (isLoggedIn) router.replace('/');
	};

	return (
		<AuthLayout title={'Ingresar'}>
			<form onSubmit={handleSubmit(onSignUp)}>
				<Box sx={{ width: 600, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h1" component="h1">
								Create an account
							</Typography>
							<Chip
								label="Email is already registered"
								color="error"
								icon={<ErrorOutline />}
								className="fadeIn"
								sx={{ display: showError ? 'flex' : 'none', marginTop: '10px', paddingY: '25px' }}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								label="Name"
								variant="filled"
								fullWidth
								{...register('name', {
									required: 'Name is required',
									minLength: { value: 4, message: 'Name must be at least 4 characters' }
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
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
							<Button color="secondary" className="circular-btn" size="large" fullWidth type="submit">
								Sign Up
							</Button>
						</Grid>

						<Grid item xs={12} display="flex" justifyContent="end">
							<NextLink href="/auth/login">Already have an account?</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
