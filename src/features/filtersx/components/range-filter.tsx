import { type Dispatch, memo } from 'react';

import { Popover, RangeSlider } from '@mantine/core';

import { Button, CaretDownIcon } from '~/shared/components';
import { roboto } from '~/shared/core/constants';
import { numFormatter } from '~/shared/utils';

import type { FilterAction, FilterState } from '../core/types';

import { FilterWrapper } from './filter-wrapper';

const NUM_STEPS = 5;
const SLIDER_STEP = 100 / NUM_STEPS;

interface Props {
  minMax: [number, number];
  value: [number, number];
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
  prefix?: string;
  label?: string;
}

const _RangeFilter = ({
  minMax,
  value,
  prefix = '$',
  label,
  type,
  dispatch,
}: Props) => {
  const [min, max] = minMax;
  const increment = Math.floor((max - min) / NUM_STEPS);
  const marks = generateMarks(min, increment, prefix);

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
              {value
                ? `${marks.find((mark) => mark.value === value[0])?.label} - ${
                    marks.find((mark) => mark.value === value[1])?.label
                  }`
                : 'Select'}
            </Button>
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <RangeSlider
            labelAlwaysOn
            value={value}
            step={SLIDER_STEP}
            label={(v) =>
              formatNum(v * (increment / SLIDER_STEP) + min, prefix)
            }
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
            onChange={(payload) => dispatch({ type, payload })}
          />
        </Popover.Dropdown>
      </Popover>
    </FilterWrapper>
  );
};

export const RangeFilter = memo(_RangeFilter);

const formatNum = (num: number, prefix?: string) =>
  `${prefix ?? ''}${numFormatter.format(num)}`;

const generateMarks = (min: number, increment: number, prefix?: string) =>
  // eslint-disable-next-line unicorn/prefer-spread
  Array.from(Array.from({ length: 6 }).keys()).map((i) => ({
    value: i * 20,
    label: formatNum(i * increment + min, prefix),
  }));
