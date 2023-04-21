import { memo, useCallback, useMemo } from 'react';

import { Popover, RangeSlider } from '@mantine/core';

import { Button, CaretDownIcon } from '~/shared/components';
import { roboto } from '~/shared/core/constants';
import { numFormatter } from '~/shared/utils';

import type { SetRangeFilterValueEvent } from '../core/types';

import FilterWrapper from './filter-wrapper';

const NUM_STEPS = 5;
const SLIDER_STEP = 100 / NUM_STEPS;

interface Props {
  label: string;
  minValue: string | null;
  maxValue: string | null;
  minParamKey: string;
  maxParamKey: string;
  minConfigValue: number;
  maxConfigValue: number;
  prefix?: string;
  send: (_: SetRangeFilterValueEvent) => void;
}

const RangeFilter = ({
  label,
  minValue,
  maxValue,
  minParamKey,
  maxParamKey,
  minConfigValue,
  maxConfigValue,
  prefix = '$',
  send,
}: Props) => {
  const increment = Math.floor((maxConfigValue - minConfigValue) / NUM_STEPS);

  const marks = useMemo(
    () => generateMarks(minConfigValue, increment, prefix),
    [increment, minConfigValue, prefix],
  );

  const labelFn = useCallback(
    (v: number) =>
      formatNum(v * (increment / SLIDER_STEP) + minConfigValue, prefix),
    [increment, minConfigValue, prefix],
  );

  const buttonText = useMemo(() => {
    if (!minValue || !maxValue) return 'Select';

    return `${formatNum(Number(minValue), prefix)} - ${formatNum(
      Number(maxValue),
      prefix,
    )}`;
  }, [maxValue, minValue, prefix]);

  const onChange = useCallback(
    ([minRangeValue, maxRangeValue]: [number, number]) => {
      const newMinValue = Math.floor(
        minRangeValue * (increment / SLIDER_STEP) + minConfigValue,
      ).toString();
      const newMaxValue = Math.ceil(
        maxRangeValue * (increment / SLIDER_STEP) + minConfigValue,
      ).toString();
      send({
        type: 'SET_RANGE_FILTER_VALUE',
        newMinValue,
        newMaxValue,
        minParamKey,
        maxParamKey,
      });
    },
    [increment, maxParamKey, minConfigValue, minParamKey, send],
  );

  const inputValue = useMemo(() => {
    const minRangeValue = Math.floor(
      (Number(minValue ?? minConfigValue) / maxConfigValue) * 100,
    );
    const maxRangeValue = Math.floor(
      (Number(maxValue ?? maxConfigValue) / maxConfigValue) * 100,
    );

    return [minRangeValue, maxRangeValue] as [number, number];
  }, [maxConfigValue, maxValue, minConfigValue, minValue]);

  return (
    <FilterWrapper label={label}>
      <Popover
        withinPortal
        position="bottom-start"
        width={320}
        classNames={{
          dropdown: 'bg-dark',
        }}
      >
        <Popover.Target>
          <div className="[&>*]:w-full">
            <Button isFullWidth variant="outline" right={<CaretDownIcon />}>
              {buttonText}
            </Button>
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <RangeSlider
            labelAlwaysOn
            step={SLIDER_STEP}
            label={labelFn}
            marks={marks}
            classNames={{
              root: 'my-10 mx-2',
              bar: 'bg-gradient-to-l from-primary to-tertiary',
              thumb: 'bg-white/60 border-primary',
              mark: 'bg-white/90 border',
              markFilled: 'border border-primary',
              label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
              markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
            }}
            value={inputValue}
            onChange={onChange}
          />
        </Popover.Dropdown>
      </Popover>
    </FilterWrapper>
  );
};

export default memo(RangeFilter);

const formatNum = (num: number, prefix?: string) =>
  `${prefix ?? ''}${numFormatter.format(num)}`;

const generateMarks = (min: number, increment: number, prefix?: string) =>
  // eslint-disable-next-line unicorn/prefer-spread
  Array.from(Array.from({ length: 6 }).keys()).map((i) => ({
    value: i * 20,
    label: formatNum(i * increment + min, prefix),
  }));
