import { ShopLayout } from '../../../components/layout';
import { ProductList } from '../../../components/products';
import { Loading } from '../../../components/ui';
import { useProducts } from '../../../hooks';

export default function KidsPage() {
	const { products, loading } = useProducts('/products?gender=kid');

	return (
		<ShopLayout title="TesloShop | Kids" pageDescription="Clothes for Kids">
			{loading ? <Loading /> : <ProductList products={products} />}
		</ShopLayout>
	);
}
