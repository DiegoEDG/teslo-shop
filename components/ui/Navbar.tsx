import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Input, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UIContext } from '../../context/ui/UIContext';

export const Navbar = () => {
	const [searchValue, setSearchValue] = useState('');
	const { pathname, push } = useRouter();
	const { toggleMenu } = useContext(UIContext);

	const handleClick = () => {
		toggleMenu();
	};

	const handleSearch = () => {
		push(`/search/${searchValue}`);
	};

	return (
		<AppBar>
			<Toolbar>
				<NextLink href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
					<Typography variant="h6" fontWeight="600">
						TesloShop
					</Typography>
				</NextLink>

				<Box flex={1} />

				<Box sx={{ display: { xs: 'none', md: 'block' } }}>
					<NextLink href="/category/men" style={{ textDecoration: 'none', marginRight: '10px' }}>
						<Button variant="outlined" className={pathname === '/category/men' ? 'active-button' : ''}>
							Men
						</Button>
					</NextLink>
					<NextLink href="/category/women" style={{ textDecoration: 'none', marginRight: '10px' }}>
						<Button variant="outlined" className={pathname === '/category/women' ? 'active-button' : ''}>
							Women
						</Button>
					</NextLink>
					<NextLink href="/category/kid" style={{ textDecoration: 'none' }}>
						<Button variant="outlined" className={pathname === '/category/kid' ? 'active-button' : ''}>
							Kids
						</Button>
					</NextLink>
				</Box>

				<Box flex={1} />
				<Input
					sx={{ display: { xs: 'none', md: 'flex' } }}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyPress={(e) => (e.key === 'Enter' ? handleSearch() : null)}
					type="text"
					placeholder="Buscar..."
				/>
				<IconButton onClick={handleSearch} sx={{ display: { xs: 'none', md: 'flex' } }}>
					<SearchOutlined />
				</IconButton>
				<IconButton onClick={handleClick} sx={{ display: { sm: 'block', md: 'none' } }}>
					<SearchOutlined />
				</IconButton>

				<NextLink href="/">
					<IconButton>
						<Badge badgeContent={2} color="secondary">
							<ShoppingCartOutlined />
						</Badge>
					</IconButton>
				</NextLink>

				<Button variant="outlined" sx={{ marginLeft: '10px' }} onClick={handleClick}>
					Menu
				</Button>
			</Toolbar>
		</AppBar>
	);
};
