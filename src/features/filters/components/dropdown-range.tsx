import Image from 'next/image';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Button, RangeSlider, Text } from '~/shared/components';

import { RangeValue } from '../types';

import { DropdownFilter } from './dropdown-filter';

interface Props {
  text: string;
  range: {
    value?: RangeValue;
    defaultValue: RangeValue;
    min: number;
    max: number;
    step: number;
  };
  onChange: (_: RangeValue) => void;
}

export const DropdownRange = ({
  text,
  range: { value, defaultValue, min, max, step },
  onChange,
}: Props) => (
  <DropdownFilter text={text}>
    <Dropdown.Item
      className={clsx(
        'flex select-none items-center rounded-md p-2 text-xs outline-none',
      )}
      onSelect={(e) => e.preventDefault()}
    >
      <RangeSlider
        defaultValue={defaultValue}
        value={value ?? defaultValue}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </Dropdown.Item>
  </DropdownFilter>
);
