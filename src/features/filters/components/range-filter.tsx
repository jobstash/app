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
  const labelFn = (v: number) => {
    const addNum =
      (v / 100) * maxConfigValue === Number(maxValue) ? 0 : minConfigValue;
    const result = formatNum(
      Math.floor((v / 100) * maxConfigValue + addNum),
      prefix,
    );

    return result;
  };

  const changedRef = useRef(false);
  const onChange = ([minRangeValue, maxRangeValue]: [number, number]) => {
    if (!changedRef.current) {
      changedRef.current = true;
    }

    const min = (minRangeValue / 100) * maxConfigValue + minConfigValue;

    const max = (maxRangeValue / 100) * maxConfigValue;

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

  const marks = [0, 20, 40, 60, 80, 100].map((value) => ({
    value,
    label: formatNum(
      value === 0 ? minConfigValue : (maxConfigValue * value) / 100,
      prefix,
    ),
  }));

  const buttonText = useMemo(() => {
    if (!minValue || !maxValue) return 'Select';

    return `${formatNum(Number(minValue), prefix)} - ${formatNum(
      Number(maxValue),
      prefix,
    )}`;
  }, [maxValue, minValue, prefix]);

  const inputValue = useMemo(
    () =>
      [
        minValue === null
          ? 0
          : Math.floor((Number(minValue) / maxConfigValue) * 100) - 1,
        maxValue === null
          ? 100
          : Math.floor((Number(maxValue) / maxConfigValue) * 100),
      ] as [number, number],
    [maxConfigValue, maxValue, minValue],
  );

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
            label={labelFn}
            classNames={{
              root: 'my-10 mx-2',
              bar: 'bg-gradient-to-l from-primary to-tertiary',
              thumb: 'bg-white border-primary',
              mark: 'bg-white/90 border',
              markFilled: 'border border-primary',
              label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
              markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
            }}
            marks={marks}
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
