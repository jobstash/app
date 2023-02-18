import type { Dispatch } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Text } from '~/shared/components';

import type { FilterAction, FilterState, MultiSelectItem } from '../core/types';
import { toggleMultiSelectItem } from '../utils';

import { CheckedIcon } from './checked-icon';
import { DropdownUi } from './dropdown-ui';
import { UnCheckedIcon } from './unchecked-icon';

type Props = {
  text: string;
  items: MultiSelectItem[];
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
};

export const MultiSelectFilter = ({ text, items, type, dispatch }: Props) => (
  <DropdownUi text={text}>
    {items.map(({ label, isChecked }) => (
      <div key={label} className="my-2">
        <Dropdown.CheckboxItem
          checked={isChecked}
          className={clsx(
            'flex cursor-pointer select-none items-center gap-x-2 rounded-md p-2 text-xs outline-none',
            'hover:bg-zinc-600',
            { 'bg-zinc-700': isChecked },
          )}
          onCheckedChange={(checked) =>
            toggleMultiSelectItem(
              { label, isChecked: Boolean(checked) },
              items,
              type,
              dispatch,
            )
          }
          onSelect={(e) => e.preventDefault()}
        >
          {!isChecked && <UnCheckedIcon />}
          <Dropdown.ItemIndicator>
            <CheckedIcon />
          </Dropdown.ItemIndicator>
          <Text>{label}</Text>
        </Dropdown.CheckboxItem>
      </div>
    ))}
  </DropdownUi>
);
