import type { MultiSelectSearchFilterConfig } from '../core/interfaces';
import type { FilterState, FilterStateMultiSelectKey } from '../core/types';

export const getMultiSelectProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: MultiSelectSearchFilterConfig,
) => {
  const { label, options } = config as MultiSelectSearchFilterConfig;
  const items = options.map(({ label }) => label);
  const selectedItems = filters[key as FilterStateMultiSelectKey];
  const numSelected = selectedItems?.size ?? 0;
  const text = `${label}${numSelected > 0 ? `: ${numSelected} selected` : ''}`;

  return {
    text,
    items,
    selectedItems,
  };
};
