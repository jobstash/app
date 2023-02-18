import { Dispatch } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import type { Action, RangePayload, RangeSliderProps } from '../core/types';

import { DropdownUi } from './dropdown-ui';
import { RangeSliderUi } from './range-slider-ui';

interface Props<C extends Object> {
  text: string;
  range: RangeSliderProps;
  type: keyof C;
  dispatch: Dispatch<Action<C, RangePayload>>;
}

export const RangeFilter = <C extends Object>({
  text,
  range,
  type,
  dispatch,
}: Props<C>) => (
  <DropdownUi text={text}>
    <Dropdown.Item
      className={clsx(
        'flex select-none items-center rounded-md p-2 text-xs outline-none',
      )}
      onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing onClick
    >
      <RangeSliderUi
        range={range}
        onChange={(payload) => dispatch({ type, payload })}
      />
    </Dropdown.Item>
  </DropdownUi>
);
