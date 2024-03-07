import { useState } from 'react';

import { SliderValue } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { formatNumber } from '~/shared/utils/format-number';

import { useFiltersContext } from '~/filters/providers/filters-provider/context';

import { RangeInputProps } from './types';

export const useRangeInput = (props: RangeInputProps) => {
  const { config, paramValues } = props;

  const {
    label,
    prefix,
    value: {
      lowest: { paramKey: minParamKey, value: minConfigValue },
      highest: { paramKey: maxParamKey, value: maxConfigValue },
    },
  } = config;

  const max = Math.round(maxConfigValue);
  const step = Math.round(max / 100);

  const minInitValue = getInitValue({
    paramValue: paramValues.min,
    step,
    minConfigValue,
    mark: LOWER_DEFAULT_MARK,
  });

  const maxInitValue = getInitValue({
    paramValue: paramValues.max,
    step,
    minConfigValue,
    mark: HIGHER_DEFAULT_MARK,
  });

  const [value, setValue] = useState<number[]>([minInitValue, maxInitValue]);

  const onChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const { atom } = useFiltersContext();
  const [filterParams, setFilterParams] = useAtom(atom);

  // Set param values atom after change
  const onChangeEnd = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const newParams = new URLSearchParams(filterParams);

      newParams.set(minParamKey, Math.round(newValue[0]).toString());
      newParams.set(maxParamKey, Math.round(newValue[1]).toString());

      setFilterParams(newParams);
    }
  };

  const getValue = (v: SliderValue) => {
    const prefixText = prefix ?? '';

    const min = Math.round((v as number[])[0]);
    const max = Math.round((v as number[])[1]);

    const minText = `${prefixText}${formatNumber(min)}`;
    const maxText = `${prefixText}${formatNumber(max)}`;

    return `${minText} - ${maxText}`;
  };

  const tooltipValueFormatOptions = getFormatStyles(prefix);

  return {
    label,
    step,
    maxValue: max,
    value,
    onChange,
    onChangeEnd,
    getValue,
    tooltipValueFormatOptions,
  };
};

const LOWER_DEFAULT_MARK = 20;
const HIGHER_DEFAULT_MARK = 80;

const getInitValue = ({
  paramValue,
  step,
  minConfigValue,
  mark,
}: {
  paramValue: number;
  step: number;
  minConfigValue: number;
  mark: number;
}) => {
  if (isNaN(paramValue)) {
    // Get step multiple for min-value
    const minStepValue = Math.floor(minConfigValue / step) * step;

    // Default value using min-step-multiple and default mark
    return minStepValue + step * mark;
  }

  return paramValue;
};

const getFormatStyles = (
  prefix: string | null,
): Intl.NumberFormatOptions | undefined => {
  if (prefix === '$') {
    return { notation: 'compact', style: 'currency', currency: 'USD' };
  }
};
