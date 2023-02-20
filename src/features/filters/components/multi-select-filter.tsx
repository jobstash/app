import { Dispatch } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Text } from '~/shared/components';

import type { FilterAction, FilterState } from '../core/types';

import { CheckedIcon } from './checked-icon';
import { DropdownUi } from './dropdown-ui';
import { UnCheckedIcon } from './unchecked-icon';

type Props = {
  text: string;
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
  items: string[];
  selectedItems?: Set<string>;
};

export const MultiSelectFilter = ({
  text,
  type,
  dispatch,
  items,
  selectedItems,
}: Props) => {
  const toggleChecked = (checked: boolean, label: string) => {
    const payload = new Set(selectedItems ?? []);
    checked ? payload.add(label) : payload.delete(label);
    dispatch({ type, payload });
  };

  return (
    <DropdownUi text={text}>
      {items.map((label) => {
        const isChecked = selectedItems?.has(label);
        return (
          <div key={label} className="my-2">
            <Dropdown.CheckboxItem
              checked={isChecked}
              className={clsx(
                'flex cursor-pointer select-none items-center gap-x-2 rounded-md p-2 text-xs outline-none',
                'hover:bg-zinc-600',
                { 'bg-zinc-700': isChecked },
              )}
              onCheckedChange={(checked) =>
                toggleChecked(Boolean(checked), label)
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
        );
      })}
    </DropdownUi>
  );
};
