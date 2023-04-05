import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
	return (
		<AppBar>
			<Toolbar>
				<NextLink href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
					<Typography variant="h6" fontWeight="600">
						TesloShop
					</Typography>
				</NextLink>

				<Box flex={1} />

				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					<NextLink href="/xd" style={{ textDecoration: 'none', marginRight: '10px' }}>
						<Button variant="outlined">Men</Button>
					</NextLink>
					<NextLink href="/" style={{ textDecoration: 'none', marginRight: '10px' }}>
						<Button variant="outlined">Women</Button>
					</NextLink>
					<NextLink href="/" style={{ textDecoration: 'none' }}>
						<Button variant="outlined">Kids</Button>
					</NextLink>
				</Box>

				<Box flex={1} />

				<IconButton>
					<SearchOutlined />
				</IconButton>

				<NextLink href="/">
					<IconButton>
						<Badge badgeContent={2} color="secondary">
							<ShoppingCartOutlined />
						</Badge>
					</IconButton>
				</NextLink>

				<Button variant="outlined" sx={{ marginLeft: '10px' }}>
					Menu
				</Button>
			</Toolbar>
		</AppBar>
	);
};
