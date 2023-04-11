import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';

export default function HomePage() {
	const { products, loading } = useProducts('/products');

	return (
		<ShopLayout title="TesloShop | Home" pageDescription="HomePage">
			<Typography variant="h1" mb={1}>
				Products
			</Typography>
			{loading ? <Loading /> : <ProductList products={products} />}
		</ShopLayout>
	);
}
