const NUM_FORMATTER = Intl.NumberFormat('en', { notation: 'compact' });

export const formatNumber = (num: number) => NUM_FORMATTER.format(num);
