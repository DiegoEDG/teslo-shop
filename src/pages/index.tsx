import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';

export default function HomePage() {
	const { products, loading } = useProducts('/products');

	return (
		<ShopLayout title="HomePage" pageDescription="HomePage">
			{loading ? <Loading /> : <ProductList products={products} />}
		</ShopLayout>
	);
}
