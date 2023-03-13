import { numFormatter } from '~/shared/utils';

import { RangeSliderProps } from '../core/interfaces';

export const formatRangeFilterText = (
  key: string,
  label: string,
  range: RangeSliderProps,
) => {
  const { min, max, value, prefix } = range;

  const minValue = value[0];
  const maxValue = value[1];
  const minStr = prefix + numFormatter.format(minValue);
  const maxStr = prefix + numFormatter.format(maxValue);

  if (minValue === min && maxValue !== max) {
    return `${label}: Less than ${maxStr}`;
  }

  if (minValue !== min && maxValue === max) {
    return `${label}: At least ${minStr}`;
  }

  if (minValue === min && maxValue === max) {
    return `${label}: Any ${label}`;
  }

  return `${label}: ${minStr} - ${maxStr}`;
};
