import { ShopLayout } from '../../../components/layout';
import { ProductList } from '../../../components/products';
import { Loading } from '../../../components/ui';
import { useProducts } from '../../../hooks';

export default function WomenPage() {
	const { products, loading } = useProducts('/products?gender=women');

	return (
		<ShopLayout title="WomenPage" pageDescription="Clothes for Women">
			{loading ? <Loading /> : <ProductList products={products} />}
		</ShopLayout>
	);
}
