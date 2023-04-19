import { useContext, useState } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Typography
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined
} from '@mui/icons-material';
import Link from 'next/link';
import { AuthContext } from '../../context';

export const SideMenu = () => {
	const { isMenuOpen, toggleMenu } = useContext(UIContext);
	const { isLoggedIn, userData, logOut } = useContext(AuthContext);
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = () => {
		navigateTo(`/search/${searchValue}`);
	};

	const navigateTo = (url: string) => {
		router.push(url);
		toggleMenu();
	};

	const handlelogOut = () => {
		logOut();
		router.replace('/');
	};
	return (
		<Drawer
			open={isMenuOpen}
			onClose={toggleMenu}
			anchor="right"
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
		>
			{userData?.user.name && (
				<Typography variant="h5" sx={{ paddingTop: '10px', marginX: 'auto' }}>
					Hi {`${userData?.user.name}`}!
				</Typography>
			)}
			<Box sx={{ width: 250 }}>
				<List sx={{ paddingTop: 0 }}>
					<ListItem>
						<Input
							value={searchValue}
							onChange={(ev) => setSearchValue(ev.target.value)}
							onKeyPress={(ev) => (ev.key === 'Enter' ? handleSearch() : null)}
							type="text"
							placeholder="Buscar..."
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleSearch}>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					{isLoggedIn && (
						<>
							<ListItem button>
								<ListItemIcon>
									<AccountCircleOutlined />
								</ListItemIcon>
								<ListItemText primary={'Profile'} />
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'My orders'} />
							</ListItem>

							<ListItem button onClick={handlelogOut}>
								<ListItemIcon>
									<LoginOutlined />
								</ListItemIcon>
								<ListItemText primary={'Log Out'} />
							</ListItem>
						</>
					)}

					<ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/men')}>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Men'} />
					</ListItem>

					<ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/women')}>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Women'} />
					</ListItem>

					<ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/kids')}>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Kids'} />
					</ListItem>

					{!isLoggedIn && (
						<Link href={`/auth/login?p=${router.pathname}`} style={{ textDecoration: 'none' }}>
							<ListItem button onClick={toggleMenu}>
								<ListItemIcon>
									<VpnKeyOutlined />
								</ListItemIcon>
								<ListItemText primary={'Log In'} />
							</ListItem>
						</Link>
					)}

					{/* Admin */}
					{userData?.user.role === 'admin' && (
						<>
							<Divider />
							<ListSubheader>Admin Panel</ListSubheader>

							<ListItem button>
								<ListItemIcon>
									<CategoryOutlined />
								</ListItemIcon>
								<ListItemText primary={'Products'} />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Orders'} />
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<AdminPanelSettings />
								</ListItemIcon>
								<ListItemText primary={'Users'} />
							</ListItem>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
};
