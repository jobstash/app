'use client';

import { useState } from 'react';

import { Slider, SliderValue } from '@nextui-org/slider';
import { TooltipProps } from '@nextui-org/tooltip';
import { useAtom } from 'jotai';

import { formatNumber } from '~/shared/utils/format-number';

import { RangeFilterConfig } from '~/filters/core/schemas';
import { jobFiltersSearchParamsAtom } from '~/jobs/atoms/job-filters-search-params-atom';

interface Props {
  step: number;
  initValue: number[];
  config: RangeFilterConfig;
}

export const RangeInput = (props: Props) => {
  const {
    step,
    initValue,
    config: {
      prefix,
      label,
      value: {
        lowest: { paramKey: minParamKey },
        highest: { paramKey: maxParamKey, value: maxConfigValue },
      },
    },
  } = props;

  const [value, setValue] = useState<number[]>(initValue);

  const onChange = (v: number | number[]) => {
    setValue(v as number[]);
  };

  const [jobFilterParams, setJobFilterParams] = useAtom(
    jobFiltersSearchParamsAtom,
  );

  // Set param values atom after change
  const onChangeEnd = (v: number | number[]) => {
    if (Array.isArray(v)) {
      const newParams = new URLSearchParams(jobFilterParams);

      newParams.set(minParamKey, Math.round(v[0]).toString());
      newParams.set(maxParamKey, Math.round(v[1]).toString());

      setJobFilterParams(newParams);
    }
  };

  const getValue = (v: SliderValue) => getRangeText(v, prefix);

  const tooltipFormatProps = getFormatStyles(prefix);

  return (
    <Slider
      size="sm"
      label={label}
      step={step}
      minValue={0}
      maxValue={Math.round(maxConfigValue)}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      value={value}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      getValue={getValue}
      classNames={SLIDER_CLASSNAMES}
      tooltipProps={TOOLTIP_PROPS}
      tooltipValueFormatOptions={tooltipFormatProps}
    />
  );
};

const SLIDER_CLASSNAMES = {
  base: 'max-w-xs',
  filler: 'bg-gradient-to-l from-primary to-secondary',
  labelWrapper: 'mb-2',
  label: 'font-medium text-white/70 text-xs',
  value: 'font-medium text-xs',
  thumb: [
    'transition-size',
    'bg-gradient-to-l from-primary to-secondary',
    'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
    'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6',
  ],
  step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50 px-8',
  trackWrapper: 'pl-2',
};

const TOOLTIP_PROPS: Partial<TooltipProps> = {
  offset: 10,
  placement: 'bottom',
  classNames: {
    base: [
      // arrow color
      'before:bg-gradient-to-l before:from-secondary before:to-primary',
    ],
    content: [
      'py-2 shadow-xl',
      'font-semibold text-white bg-gradient-to-l from-primary to-secondary',
    ],
  },
};

const getRangeText = (value: SliderValue, prefix: string | null) => {
  const prefixText = prefix ?? '';

  const min = Math.round((value as number[])[0]);
  const max = Math.round((value as number[])[1]);

  const minText = `${prefixText}${formatNumber(min)}`;
  const maxText = `${prefixText}${formatNumber(max)}`;

  return `${minText} - ${maxText}`;
};

const getFormatStyles = (
  prefix: string | null,
): Intl.NumberFormatOptions | undefined => {
  if (prefix === '$') {
    return { notation: 'compact', style: 'currency', currency: 'USD' };
  }
};
