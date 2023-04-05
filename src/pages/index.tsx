import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { initialData } from '../../database/products';

export default function Home() {
	return (
		<ShopLayout title="Home" pageDescription="HomePage">
			<ProductList products={initialData.products as any} />
		</ShopLayout>
	);
}
