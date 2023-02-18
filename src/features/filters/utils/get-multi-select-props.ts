import type {
  ConfigMultiSelectFilter,
  ConfigMultiSelectSearchFilter,
  FilterState,
  FilterStateMultiSelectKey,
} from '../core/types';

export const getMultiSelectProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: ConfigMultiSelectFilter | ConfigMultiSelectSearchFilter,
) => {
  const { label, value } = config as ConfigMultiSelectFilter;
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
