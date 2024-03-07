import { RangeFilterConfig } from '~/filters/core/schemas';

import { RangeInput } from './range-input';

interface RangeItemProps {
  config: RangeFilterConfig;
  urlFilterParams: URLSearchParams;
}

export const RangeItem = ({ config, urlFilterParams }: RangeItemProps) => {
  const {
    value: {
      lowest: { paramKey: minParamKey, value: minConfigValue },
      highest: { paramKey: maxParamKey, value: maxConfigValue },
    },
  } = config;

  const max = Math.round(maxConfigValue);

  const step = Math.round(max / 100);

  const minInitValue = getInitValueFromSearchParams({
    urlFilterParams,
    key: minParamKey,
    step,
    minConfigValue,
    defaultMark: LOWER_DEFAULT_MARK,
  });

  const maxInitValue = getInitValueFromSearchParams({
    urlFilterParams,
    key: maxParamKey,
    step,
    minConfigValue,
    defaultMark: HIGHER_DEFAULT_MARK,
  });

  return (
    <RangeInput
      step={step}
      initValue={[minInitValue, maxInitValue]}
      config={config}
    />
  );
};

const LOWER_DEFAULT_MARK = 20;
const HIGHER_DEFAULT_MARK = 80;

const getInitValueFromSearchParams = ({
  urlFilterParams,
  key,
  step,
  minConfigValue,
  defaultMark,
}: {
  urlFilterParams: URLSearchParams;
  key: string;
  step: number;
  minConfigValue: number;
  defaultMark: number;
}) => {
  // Convert raw params to number
  const raw = urlFilterParams.get(key);
  const value = raw ? Number(raw) : NaN;

  // Fallback default value if NaN
  return isNaN(value)
    ? getDefaultValue(step, minConfigValue, defaultMark)
    : value;
};

const getDefaultValue = (
  step: number,
  minConfigValue: number,
  defaultMark: number,
) => {
  // Get step multiple for min-value
  const minStepValue = Math.floor(minConfigValue / step) * step;

  // Default value using min-step-multiple and default mark
  const defaultValue = minStepValue + step * defaultMark;

  return defaultValue;
};
