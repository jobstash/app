import { Dispatch, memo, useMemo, useRef } from 'react';

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
  const increment = Math.round((maxConfigValue - minConfigValue) / 100);

  const labelFn = (v: number) =>
    formatNum(increment * v + minConfigValue, prefix);

  const marks = [0, 20, 40, 60, 80, 100].map((value) => ({
    value,
    label: formatNum(increment * value + minConfigValue, prefix),
  }));

  const onChange = ([minRangeValue, maxRangeValue]: [number, number]) => {
    const min = minRangeValue * increment + minConfigValue;
    const max = maxRangeValue * increment + minConfigValue;

    dispatch({
      type: 'SET_RANGE_FILTER_VALUE',
      payload: {
        min: min.toString(),
        max: max.toString(),
        minParamKey,
        maxParamKey,
      },
    });
  };

  const isBordered = Boolean(minValue) || Boolean(maxValue);

  const buttonText = useMemo(() => {
    if (!minValue || !maxValue) return 'Select';

    return `${formatNum(Number(minValue), prefix)} - ${formatNum(
      Number(maxValue),
      prefix,
    )}`;
  }, [maxValue, minValue, prefix]);

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
            label={labelFn}
            marks={marks}
            classNames={{
              root: 'my-10 mx-2',
              bar: 'bg-gradient-to-l from-primary to-tertiary',
              thumb: 'bg-white border-primary',
              mark: 'bg-white/90 border',
              markFilled: 'border border-primary',
              label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
              markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
            }}
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
