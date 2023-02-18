import type {
  ConfigBooleanFilter,
  ConfigDateFilter,
  ConfigSingleSelectFilter,
} from '../core/types';

export const getSingleSelectProps = (
  config: ConfigSingleSelectFilter | ConfigDateFilter | ConfigBooleanFilter,
) => {
  const { label, value } = config as ConfigSingleSelectFilter;
  const labels = value.map((v) => v.label);
  const ariaLabel = `Filter by ${label}`;

  return {
    text: label,
    labels,
    ariaLabel,
  };
};
