const currencyFormat = (value: number) => {
	const formatedValue = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(value);

	return formatedValue;
};
export default currencyFormat;
