import type {
  FilterState,
  FilterStateMultiSelectKey,
  MultiSelectFilterConfig,
  MultiSelectSearchFilterConfig,
} from '../core/types';

export const getMultiSelectProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: MultiSelectFilterConfig | MultiSelectSearchFilterConfig,
) => {
  const { label, value } = config as MultiSelectFilterConfig;
  const items = value.map(({ label }) => label);
  const selectedItems = filters[key as FilterStateMultiSelectKey];
  const numSelected = selectedItems?.size ?? 0;
  const text = `${label}${numSelected > 0 ? `: ${numSelected} selected` : ''}`;

  return {
    text,
    items,
    selectedItems,
  };
};
