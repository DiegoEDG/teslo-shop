import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';

const EmptyPage = () => {
	return (
		<ShopLayout title="Carrito vació" pageDescription="No hay artículos en el carrito de compras">
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="calc(100vh - 200px)"
				sx={{ flexDirection: 'column' }}
			>
				<RemoveShoppingCartOutlined sx={{ fontSize: 90 }} />
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography>Your cart is empty, buy something to populate it!</Typography>
					<NextLink href="/" style={{ color: '#fcdab7' }}>
						Back to shop
					</NextLink>
				</Box>
			</Box>
		</ShopLayout>
	);
};

export default EmptyPage;
