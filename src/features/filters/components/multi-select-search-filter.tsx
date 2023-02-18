import {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';

import { Lato } from '@next/font/google';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Button, Text } from '~/shared/components';

import { FilterAction, FilterState, MultiSelectItem } from '../core/types';
import { toggleMultiSelectItem } from '../utils';

import { CloseSvgIcon } from './close-svg-icon';
import { DropdownUi } from './dropdown-ui';
import { UnCheckedIcon } from './unchecked-icon';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

type Props = {
  text: string;
  items: MultiSelectItem[];
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
};

export const MultiSelectSearchFilter = ({
  text,
  items,
  type,
  dispatch,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setInputValue(e.target.value);

  const clearInput = () => setInputValue('');

  const toggleItem = (selected: MultiSelectItem) => {
    toggleMultiSelectItem(selected, items, type, dispatch);
    clearInput();
  };

  const selectedItems = items.filter((item) => item.isChecked);

  const availableItems = items.filter(
    (item) =>
      !item.isChecked &&
      item.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && availableItems.length > 0) {
      toggleItem({ label: availableItems[0].label, isChecked: true });
    }
  };

  const clearItems = () => {
    dispatch({
      type,
      payload: items.map(({ label }) => ({ label, isChecked: false })),
    });
  };

  return (
    <DropdownUi text={text}>
      {selectedItems.length === items.length ? null : (
        <div className="relative flex items-center justify-between space-x-2 py-2">
          <Dropdown.Item asChild onSelect={(e) => e.preventDefault()}>
            <input
              value={inputValue}
              className={`rounded-lg bg-zinc-800 py-1 px-4 text-md text-white ${lato.variable} w-full border border-zinc-700 font-sans`}
              placeholder="Type to filter values"
              tabIndex={-1}
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
            />
          </Dropdown.Item>
          <Button
            size="sm"
            textProps={{
              className: `font-sans ${lato.variable}`,
            }}
            onClick={clearItems}
          >
            Clear
          </Button>
        </div>
      )}
      <div className="my-2 pl-2">
        {availableItems.map(({ label, isChecked }) => (
          <Dropdown.Item
            key={label}
            className={clsx(
              'flex cursor-pointer select-none items-center gap-x-2 rounded-md p-2 text-xs outline-none',
              'hover:bg-zinc-600',
              { 'bg-zinc-500': isChecked },
              { 'focus:bg-zinc-700': !isChecked },
            )}
            onClick={() => toggleItem({ label, isChecked: !isChecked })}
            onSelect={(e) => e.preventDefault()}
          >
            <Dropdown.ItemIndicator>
              <UnCheckedIcon />
            </Dropdown.ItemIndicator>
            <Text className={`font-sans ${lato.variable}`}>{label}</Text>
          </Dropdown.Item>
        ))}
      </div>
      {selectedItems.length > 0 && (
        <div className="pl-2">
          <Dropdown.Separator className="my-1 h-px bg-zinc-700" />
          <Dropdown.Label
            className={clsx({ 'my-2': availableItems.length > 0 })}
          >
            <Text
              className={`font-sans ${lato.variable} text-gray-400`}
              size="md"
            >
              Selected Items:
            </Text>
          </Dropdown.Label>
          <div className="my-3 flex w-full gap-x-2">
            {selectedItems.map(({ label }) => (
              <Button
                key={label}
                size="sm"
                textProps={{
                  className: `font-sans ${lato.variable}`,
                }}
                right={<CloseSvgIcon />}
                onClick={() => toggleItem({ label, isChecked: false })}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </DropdownUi>
  );
};
