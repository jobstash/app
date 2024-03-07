'use client';

import { Slider } from '@nextui-org/slider';
import { TooltipProps } from '@nextui-org/tooltip';

import { RangeInputProps } from './types';
import { useRangeInput } from './use-range-input';

export const RangeInput = (props: RangeInputProps) => {
  const {
    label,
    step,
    maxValue,
    value,
    onChange,
    onChangeEnd,
    getValue,
    tooltipValueFormatOptions,
  } = useRangeInput(props);

  return (
    <Slider
      size="sm"
      label={label}
      step={step}
      minValue={0}
      maxValue={maxValue}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      value={value}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      getValue={getValue}
      classNames={SLIDER_CLASSNAMES}
      tooltipProps={TOOLTIP_PROPS}
      tooltipValueFormatOptions={tooltipValueFormatOptions}
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
