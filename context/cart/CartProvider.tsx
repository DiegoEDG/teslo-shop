import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { IAddressInfo, ICartProduct, ISummaryInfo, IOrder } from '../../interfaces';
import { CartContext } from './CartContext';
import cartReducer from './cartReducer';
import Cookie from 'js-cookie';
import { tesloApi } from '../../api';

export interface CartState {
	addressInfo?: IAddressInfo;
	cart: ICartProduct[];
	productsQty: number;
	subTotal: number;
	taxes: number;
	total: number;
}

const CART_INITIAL_STATE: CartState = {
	addressInfo: undefined,
	cart: [],
	productsQty: 0,
	subTotal: 0,
	taxes: 0,
	total: 0
};

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		try {
			const cookieCart = JSON.parse(Cookie.get('cart') ?? '[]');
			if (cookieCart.length > 0) dispatch({ type: '[Cart] Get Products From Cookies', payload: cookieCart });
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		try {
			const cookieAddress: IAddressInfo = JSON.parse(Cookie.get('addressInfo') ?? '{}');
			if (cookieAddress.address1) dispatch({ type: '[Cart] Get Address From Cookies', payload: cookieAddress });
		} catch (err) {
			// console.log(err);
		}
	}, []);

	useEffect(() => {
		Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		Cookie.set('addressInfo', JSON.stringify(state.addressInfo));
	}, [state.addressInfo]);

	useEffect(() => {
		const productsQty = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
		const subTotal = state.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0);
		const taxes = subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
		const total = taxes + subTotal;

		const summaryInfo = { productsQty, subTotal, taxes, total };

		updateSummaryInfo(summaryInfo);
	}, [state.cart]);

	const addProduct = (product: ICartProduct) => {
		const productInCart = state.cart.some((p) => p._id === product._id);
		if (!productInCart) return dispatch({ type: '[Cart] Add Product', payload: product });

		const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
		if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] Add Product', payload: product });

		// Acumular
		const updatedProducts = state.cart.map((p) => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			// Actualizar la cantidad
			p.quantity += product.quantity;
			return p;
		});

		dispatch({ type: '[Cart] Update Qty', payload: updatedProducts });
	};

	const updateCartQuantity = (product: ICartProduct) => {
		const cartUpdated = state.cart.map((productOnState) => {
			if (productOnState._id !== product._id) return productOnState;
			if (productOnState.size !== product.size) return productOnState;
			return product;
		});

		dispatch({ type: '[Cart] Update Qty On Cart Product', payload: cartUpdated });
	};

	const deleteCartProduct = (product: ICartProduct) => {
		const cartUpdated = state.cart.filter(
			(productInCart) => !(productInCart._id === product._id && productInCart.size === product.size)
		);

		dispatch({ type: '[Cart] Delete Product From Cart', payload: cartUpdated });
	};

	const updateSummaryInfo = (summaryInfo: ISummaryInfo) => {
		dispatch({ type: '[Cart] Update Summary Info', payload: summaryInfo });
	};

	const updateAddressInfo = (addressInfo: IAddressInfo) => {
		dispatch({ type: '[Cart] Get Address From Cookies', payload: addressInfo });
	};

	const createOrder = async (userId: string): Promise<IOrder | null> => {
		if (!state.addressInfo) {
			throw Error('[CartProvider] Address info is missing');
		}
		if (!userId) {
			throw Error('[CartProvider] User not authenticated');
		}
		if (!state.cart) {
			throw Error('[CartProvider] Cart is empty');
		}

		const newOrder: IOrder = {
			orderItems: state.cart.map((product) => ({ ...product, size: product.size! })),
			addressInfo: state.addressInfo,
			user: userId,
			isPaid: false,
			productsQty: state.productsQty,
			subTotal: state.subTotal,
			taxes: state.taxes,
			total: state.total
		};

		try {
			const { data } = await tesloApi.post<IOrder>('/orders', newOrder);
			dispatch({ type: '[Cart] Order Created', payload: data });
			return data;
		} catch (error) {
			console.log('[CartProvider] Error in api', error);
			return null;
		}
	};

	return (
		<CartContext.Provider
			value={{ ...state, addProduct, updateCartQuantity, deleteCartProduct, updateAddressInfo, createOrder }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
