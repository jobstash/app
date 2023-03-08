import type { SingleSelectFilterConfig } from '../core/interfaces';

export const getSingleSelectProps = (
  config: SingleSelectFilterConfig,
  _value?: string,
) => {
  const { label, options } = config as SingleSelectFilterConfig;

  const text = options.find(({ value }) => value === _value)?.label ?? label;
  const ariaLabel = `Filter by ${text}`;

  return {
    text,
    options,
    ariaLabel,
  };
};
