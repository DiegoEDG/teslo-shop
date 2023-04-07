import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from '../../themes';
import '@/styles/globals.css';
import { UIProvider } from '../../context';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
			}}
		>
			<UIProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</UIProvider>
		</SWRConfig>
	);
}
