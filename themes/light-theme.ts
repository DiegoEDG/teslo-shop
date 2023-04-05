import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#FCDAB7'
		},
		secondary: {
			main: '#1E5F74'
		},
		background: {
			default: '#1D2D50'
		}
	},
	components: {
		MuiLink: {
			defaultProps: {
				underline: 'none'
			}
		},

		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				position: 'fixed'
			},
			styleOverrides: {
				root: {
					backgroundColor: '#1D2D50',
					height: 60
				}
			}
		},

		MuiTypography: {
			styleOverrides: {
				h1: {
					fontSize: 50,
					fontWeight: 600
				},
				h2: {
					fontSize: 30,
					fontWeight: 400
				},
				subtitle1: {
					fontSize: 20,
					fontWeight: 600
				}
			}
		},

		MuiButton: {
			defaultProps: {
				variant: 'contained',
				size: 'small',
				disableElevation: true
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
					boxShadow: 'none',
					borderRadius: 10,
					':hover': {
						backgroundColor: 'rgba(0,0,0,0.05)',
						transition: 'all 0.3s ease-in-out'
					}
				}
			}
		},

		MuiCard: {
			defaultProps: {
				elevation: 0
			},
			styleOverrides: {
				root: {
					boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
					borderRadius: '10px'
				}
			}
		}
	}
});
