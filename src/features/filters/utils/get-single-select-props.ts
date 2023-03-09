import type { SingleSelectFilterConfig } from '../core/interfaces';

export const getSingleSelectProps = (
  config: SingleSelectFilterConfig,
  _value?: string,
) => {
  const { label, options } = config as SingleSelectFilterConfig;

  const ariaLabel = `Filter by ${label}`;

  return {
    text: label,
    options,
    ariaLabel,
  };
};
