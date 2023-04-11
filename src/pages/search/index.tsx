import { GetServerSideProps } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';

const SearchIndexPage = () => {
	return (
		<ShopLayout title="TesloShop | Search" pageDescription="SearchIndexPage">
			<Typography variant="h1" mb={1}>
				Redirect...
			</Typography>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		redirect: {
			destination: '/',
			permanent: true
		}
	};
};

export default SearchIndexPage;
