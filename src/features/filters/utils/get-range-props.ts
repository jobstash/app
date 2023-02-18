import type {
  ConfigRangeFilter,
  FilterState,
  FilterStateRangeKey,
  RangeSliderProps,
} from '../core/types';

import { formatRangeFilterText } from './format-range-filter-text';

export const getRangeProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: ConfigRangeFilter,
) => {
  const {
    label,
    value: {
      lowest: { value: min },
      highest: { value: max },
    },
    step_size,
  } = config;

  const currentValue = filters[key as FilterStateRangeKey];
  const defaultValue: RangeSliderProps['defaultValue'] = [min, max];

  const range: RangeSliderProps = {
    min,
    max,
    step: step_size,
    value: currentValue ?? defaultValue,
    defaultValue,
  };

  const text = currentValue ? formatRangeFilterText(key, label, range) : label;

  return {
    text,
    range,
  };
};
