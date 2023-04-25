import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';
import { currencyFormat } from '../../utils';

interface Props {
	orderSummaryInfo?: {
		subTotal: number;
		taxes: number;
		total: number;
		productsQty: number;
	};
}

export const OrderSummary: FC<Props> = ({ orderSummaryInfo }) => {
	const { subTotal, taxes, total, productsQty } = useContext(CartContext);
	const SummaryInfo = orderSummaryInfo ? orderSummaryInfo : { subTotal, taxes, total, productsQty };
	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography>Products</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{SummaryInfo.productsQty} items</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>SubTotal</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{currencyFormat(SummaryInfo.subTotal)}</Typography>
			</Grid>

			<Grid item xs={6}>
				<Typography>Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="end">
				<Typography>{currencyFormat(SummaryInfo.taxes)}</Typography>
			</Grid>

			<Grid item xs={6} sx={{ mt: 2 }}>
				<Typography variant="h6" fontWeight={600}>
					Total:
				</Typography>
			</Grid>
			<Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
				<Typography variant="h6" fontWeight={600}>
					{currencyFormat(SummaryInfo.total)}
				</Typography>
			</Grid>
		</Grid>
	);
};
