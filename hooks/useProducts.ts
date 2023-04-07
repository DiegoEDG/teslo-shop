import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';

export const useProducts = (url: string) => {
	const { data, error } = useSWR<IProduct[]>(`/api${url}`);

	return {
		products: data || [],
		error,
		loading: !data && !error
	};
};
