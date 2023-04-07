import { ShopLayout } from '../../../components/layout';
import { ProductList } from '../../../components/products';
import { Loading } from '../../../components/ui';
import { useProducts } from '../../../hooks';

export default function MenPage() {
	const { products, loading } = useProducts('/products?gender=men');

	return (
		<ShopLayout title="TesloShop | Men" pageDescription="Clothes for men">
			{loading ? <Loading /> : <ProductList products={products} />}
		</ShopLayout>
	);
}
