import type { SingleSelectFilterConfig } from '../core/interfaces';

export const getSingleSelectProps = (config: SingleSelectFilterConfig) => {
  const { label: text, options } = config as SingleSelectFilterConfig;
  const ariaLabel = `Filter by ${text}`;

  return {
    text,
    options,
    ariaLabel,
  };
};
