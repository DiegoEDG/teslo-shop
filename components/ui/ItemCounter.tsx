import { FC, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IProduct } from '../../interfaces';

interface Props {
	minValue: number;
	maxValue: number;
	qtyCartProd?: number;
	onSelectedQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ minValue, maxValue, onSelectedQuantity, qtyCartProd }) => {
	const [qtyValue, setQtyValue] = useState(minValue);

	const handleQty = (op: string) => {
		if (op === '-') {
			setQtyValue((currentValue) => (currentValue <= minValue ? minValue : --currentValue));
			onSelectedQuantity(qtyValue - 1);
		} else {
			setQtyValue((currentValue) => (currentValue >= maxValue ? maxValue : ++currentValue));
			onSelectedQuantity(qtyValue + 1);
		}
	};

	return (
		<Box display="flex" alignItems="center">
			<IconButton onClick={() => handleQty('-')}>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: 'center' }}>
				{qtyCartProd ? qtyCartProd : qtyValue < minValue ? minValue : qtyValue > maxValue ? maxValue : qtyValue}
			</Typography>
			<IconButton onClick={() => handleQty('+')}>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};
