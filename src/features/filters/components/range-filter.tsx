import { Dispatch } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import type { RangeSliderProps } from '../core/interfaces';
import type { FilterAction, FilterState } from '../core/types';

import { DropdownUi } from './dropdown-ui';
import { RangeSlider } from './range-slider';

interface Props {
  text: string;
  range: RangeSliderProps;
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
}

export const RangeFilter = ({ text, range, type, dispatch }: Props) => (
  <DropdownUi text={text}>
    <Dropdown.Item
      className={clsx(
        'flex select-none items-center rounded-md p-2 text-xs outline-none',
      )}
      onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing onClick
    >
      <RangeSlider
        range={range}
        onChange={(payload) => dispatch({ type, payload })}
      />
    </Dropdown.Item>
  </DropdownUi>
);
