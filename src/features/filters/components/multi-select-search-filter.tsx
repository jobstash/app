/* eslint-disable react/no-unused-prop-types */
import {
  ChangeEventHandler,
  CSSProperties,
  Dispatch,
  KeyboardEventHandler,
  useMemo,
  useState,
} from 'react';
import { FixedSizeList as List } from 'react-window';

import { Lato } from '@next/font/google';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Button, Text } from '~/shared/components';

import type { FilterAction, FilterState } from '../core/types';

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
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
  options: string[];
  selectedItems?: Set<string> | null;
};

export const MultiSelectSearchFilter = ({
  text,
  type,
  dispatch,
  options,
  selectedItems,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setInputValue(e.target.value);

  const clearInput = () => setInputValue('');

  const toggleItem = (checked: boolean, label: string) => {
    const payload = new Set(selectedItems ?? []);
    checked ? payload.add(label) : payload.delete(label);
    dispatch({ type, payload });
    clearInput();
  };

  const availableItems = useMemo(
    () =>
      options.filter(
        (item) =>
          !selectedItems?.has(item) &&
          item.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [inputValue, options, selectedItems],
  );

  // When pressing enter add the topmost available item
  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && availableItems.length > 0) {
      const payload = new Set(selectedItems ?? []);
      payload.add(availableItems[0]);
      dispatch({ type, payload });
      clearInput();
    }
  };

  const clearItems = () => {
    dispatch({
      type,
      payload: null,
    });
  };

  const numSelectedItems = selectedItems?.size ?? 0;
  const hasSelectedItems = numSelectedItems > 0;
  const displaySearchInput = numSelectedItems !== options.length;

  return (
    <DropdownUi text={text}>
      {displaySearchInput && (
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

      <List
        height={250}
        width={300}
        itemSize={35}
        itemData={availableItems}
        itemCount={availableItems.length}
      >
        {({
          data,
          index,
          style,
        }: {
          index: number;
          style: CSSProperties;
          data: string[];
        }) => {
          const label = data[index];
          const isChecked = selectedItems?.has(label);
          return (
            <div style={style}>
              <Dropdown.Item
                key={label}
                className={clsx(
                  'flex cursor-pointer select-none items-center gap-x-2 rounded-md p-2 text-xs outline-none',
                  'hover:bg-zinc-600',
                  { 'bg-zinc-500': isChecked },
                  { 'focus:bg-zinc-700': !isChecked },
                )}
                // Disable typeahead (messes with search focus)
                textValue=""
                onClick={() => toggleItem(!isChecked, label)}
                onSelect={(e) => e.preventDefault()}
              >
                <Dropdown.ItemIndicator>
                  <UnCheckedIcon />
                </Dropdown.ItemIndicator>
                <Text className={`font-sans ${lato.variable}`}>{label}</Text>
              </Dropdown.Item>
            </div>
          );
        }}
      </List>

      {displaySearchInput && hasSelectedItems && (
        <Dropdown.Separator className="my-1 h-px bg-zinc-700" />
      )}

      {hasSelectedItems && (
        <div className="pl-2">
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
          <div className="my-3 flex w-full max-w-xs flex-wrap gap-2">
            {
              // eslint-disable-next-line unicorn/prefer-spread
              Array.from(selectedItems ?? []).map((label) => (
                <Button
                  key={label}
                  size="sm"
                  textProps={{
                    className: `font-sans ${lato.variable}`,
                  }}
                  right={<CloseSvgIcon />}
                  onClick={() => toggleItem(false, label)}
                >
                  {label}
                </Button>
              ))
            }
          </div>
        </div>
      )}
    </DropdownUi>
  );
};
