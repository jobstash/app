import { numFormatter } from '~/shared/utils';

import {
  KEY_MONTHLY_FEES,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_VOLUME,
  KEY_SALARY,
  KEY_TVL,
} from '../core/constants';
import { RangeSliderProps } from '../core/interfaces';

const currencyKeys = new Set([
  KEY_SALARY,
  KEY_TVL,
  KEY_MONTHLY_VOLUME,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_FEES,
]);

export const formatRangeFilterText = (
  key: string,
  label: string,
  range: RangeSliderProps,
) => {
  const { min, max, value } = range;

  const prefix = currencyKeys.has(key) ? '$' : '';

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
