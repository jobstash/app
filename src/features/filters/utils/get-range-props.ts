import type { RangeFilterConfig, RangeSliderProps } from '../core/interfaces';
import type { FilterState, FilterStateRangeKey } from '../core/types';

import { formatRangeFilterText } from './format-range-filter-text';

export const getRangeProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: RangeFilterConfig,
) => {
  const {
    label,
    value: {
      lowest: { value: min },
      highest: { value: max },
    },
    stepSize,
  } = config;

  const currentValue = filters[key as FilterStateRangeKey];
  const defaultValue: RangeSliderProps['defaultValue'] = [min, max];

  const range: RangeSliderProps = {
    min,
    max,
    step: stepSize,
    value: currentValue ?? defaultValue,
    defaultValue,
  };

  const text = currentValue ? formatRangeFilterText(key, label, range) : label;

  return {
    text,
    range,
  };
};
