import { Dispatch, memo, useCallback, useMemo, useRef } from 'react';

import { Popover, RangeSlider } from '@mantine/core';

import { Button, CaretDownIcon } from '~/shared/components';
import { roboto } from '~/shared/core/constants';
import { numFormatter } from '~/shared/utils';

import {
  FilterParamKey,
  FilterValue,
  SetRangeFilterValueAction,
} from '../core/types';

import FilterWrapper from './filter-wrapper';

const NUM_STEPS = 5;
const SLIDER_STEP = 100 / NUM_STEPS;

interface Props {
  label: string;
  minValue: FilterValue;
  maxValue: FilterValue;
  minParamKey: FilterParamKey;
  maxParamKey: FilterParamKey;
  minConfigValue: number;
  maxConfigValue: number;
  prefix?: string;
  dispatch: Dispatch<SetRangeFilterValueAction>;
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
  dispatch,
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

  const changedRef = useRef(false);
  const onChange = useCallback(
    ([minRangeValue, maxRangeValue]: [number, number]) => {
      if (!changedRef.current) {
        changedRef.current = true;
      }

      const min = Math.floor(
        minRangeValue * (increment / SLIDER_STEP) + minConfigValue,
      ).toString();
      const max = Math.ceil(
        maxRangeValue * (increment / SLIDER_STEP) + minConfigValue,
      ).toString();
      dispatch({
        type: 'SET_RANGE_FILTER_VALUE',
        payload: { min, max, minParamKey, maxParamKey },
      });
    },
    [dispatch, increment, maxParamKey, minConfigValue, minParamKey],
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

  const isBordered =
    (Boolean(minValue) || Boolean(maxValue)) && changedRef.current;

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
            <Button
              isFullWidth
              isBordered={isBordered}
              variant="outline"
              right={<CaretDownIcon />}
              textProps={{ className: 'truncate' }}
            >
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
