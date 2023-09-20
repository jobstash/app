/* eslint-disable camelcase */
import { type Dispatch, memo, useMemo } from 'react';

import { Popover, RangeSlider } from '@mantine/core';

import {
  type FilterValue,
  type SetRangeFilterValueAction,
} from '@jobstash/filters/core';
import { GA_EVENT_ACTION, roboto } from '@jobstash/shared/core';
import { formatPrefixedNum } from '@jobstash/filters/utils';
import { gaEvent } from '@jobstash/shared/utils';

import { Button, CaretDownIcon } from '@jobstash/shared/ui';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  minValue: FilterValue;
  maxValue: FilterValue;
  minParamKey: string;
  maxParamKey: string;
  minConfigValue: number;
  maxConfigValue: number;
  prefix: string | null;
  dispatch: Dispatch<SetRangeFilterValueAction>;
  gaEventName: string | null;
}

const RangeFilter = ({
  label,
  minValue,
  maxValue,
  minParamKey,
  maxParamKey,
  minConfigValue,
  maxConfigValue,
  prefix,
  dispatch,
  gaEventName,
}: Props) => {
  const increment = Math.round((maxConfigValue - minConfigValue) / 100);

  const labelFn = (v: number) =>
    formatPrefixedNum(increment * v + minConfigValue, prefix);

  const marks = [0, 20, 40, 60, 80, 100].map((value) => ({
    value,
    label: formatPrefixedNum(increment * value + minConfigValue, prefix),
  }));

  const onChange = ([minRangeValue, maxRangeValue]: [number, number]) => {
    const min = (minRangeValue * increment + minConfigValue).toString();
    const max = (maxRangeValue * increment + minConfigValue).toString();

    dispatch({
      type: 'SET_RANGE_FILTER_VALUE',
      payload: {
        min,
        max,
        minParamKey,
        maxParamKey,
      },
    });
  };

  const onChangeEnd = ([minRangeValue, maxRangeValue]: [number, number]) => {
    const min = (minRangeValue * increment + minConfigValue).toString();
    const max = (maxRangeValue * increment + minConfigValue).toString();

    if (gaEventName) {
      gaEvent(GA_EVENT_ACTION.FILTER_ACTION, {
        filter_name: gaEventName,
        filter_value: `${min},${max}`,
      });
    }
  };

  const isBordered = Boolean(minValue) || Boolean(maxValue);

  const buttonText = useMemo(() => {
    if (!minValue || !maxValue) return 'Select';

    return `${formatPrefixedNum(
      Number(minValue),
      prefix,
    )} - ${formatPrefixedNum(Number(maxValue), prefix)}`;
  }, [maxValue, minValue, prefix]);

  const minInputValue = minValue
    ? Math.round((Number(minValue) / maxConfigValue) * 100)
    : 0;
  const maxInputValue = maxValue
    ? Math.round((Number(maxValue) / maxConfigValue) * 100)
    : 100;

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
            value={[minInputValue, maxInputValue]}
            onChange={onChange}
            onChangeEnd={onChangeEnd}
          />
        </Popover.Dropdown>
      </Popover>
    </FilterWrapper>
  );
};

export default memo(RangeFilter);
