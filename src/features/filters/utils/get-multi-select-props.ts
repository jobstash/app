import { tempLabelMap } from '../core/constants';
import type { MultiSelectSearchFilterConfig } from '../core/interfaces';
import type { FilterState, FilterStateMultiSelectKey } from '../core/types';

export const getMultiSelectProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: MultiSelectSearchFilterConfig,
) => {
  const { options } = config as MultiSelectSearchFilterConfig;
  const selectedItems = filters[key as FilterStateMultiSelectKey];

  // TODO: Remove once mw fixed returned values
  const label = tempLabelMap[key as keyof typeof tempLabelMap];

  const numSelected = selectedItems?.size ?? 0;
  const text = `${label}${numSelected > 0 ? `: ${numSelected} selected` : ''}`;

  return {
    text,
    options,
    selectedItems,
  };
};
