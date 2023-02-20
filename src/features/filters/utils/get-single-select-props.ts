import type {
  BooleanFilterConfig,
  DateFilterConfig,
  SingleSelectFilterConfig,
} from '../core/types';

export const getSingleSelectProps = (
  config: SingleSelectFilterConfig | DateFilterConfig | BooleanFilterConfig,
) => {
  const { label, value } = config as SingleSelectFilterConfig;
  const labels = value.map((v) => v.label);
  const ariaLabel = `Filter by ${label}`;

  return {
    text: label,
    labels,
    ariaLabel,
  };
};
