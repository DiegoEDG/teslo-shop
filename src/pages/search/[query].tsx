import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layout';
import { ProductList } from '../../../components/products';
import { IProduct } from '../../../interfaces/product';
import { getProductBySearch } from '../../../database/product';

interface Props {
	products: IProduct[];
	query: string;
}

const SearchPage: FC<Props> = ({ products, query }) => {
	return (
		<ShopLayout title="TesloShop | Search" pageDescription="SearchPage">
			{products.length > 0 ? (
				<>
					<Typography variant="h1" mb={1}>
						{`Results for ${query}`}
					</Typography>
					<ProductList products={products} />
				</>
			) : (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="calc(100vh - 200px)"
					sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
				>
					<Typography variant="h1" component="h1" fontSize={40} fontWeight={200}>
						Products for
					</Typography>
					<Typography variant="h1" component="h1" fontSize={40} fontWeight={600} ml={1} mr={1}>
						{`${query}`}
					</Typography>
					<Typography variant="h1" component="h1" fontSize={40} fontWeight={200}>
						not found, try a new search!
					</Typography>
				</Box>
			)}
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { query = '' } = ctx.params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: '/',
				permanent: true
			}
		};
	}

	const products = await getProductBySearch(query);

	return {
		props: {
			products,
			query
		}
	};
};

export default SearchPage;
