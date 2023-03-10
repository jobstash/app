import Image from 'next/image';
import { type Dispatch } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';

import { Button, Text } from '~/shared/components';

import type { FilterAction, FilterState } from '../core/types';

interface Props {
  text: string;
  value: string;
  ariaLabel: string;
  options: { label: string; value: string }[];
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
}

export const SingleSelectFilter = ({
  text,
  value,
  options,
  ariaLabel,
  type,
  dispatch,
}: Props) => {
  const dispatchFn = (clickedLabel: string) => {
    const payload = options.find(({ label }) => label === clickedLabel)?.value;
    if (payload === undefined) return;

    dispatch({ type, payload });
  };

  const { label } = options.find(({ value: _value }) => _value === value) ?? {
    label: text,
  };

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={(label) => dispatchFn(label)}
    >
      <SelectPrimitive.Trigger asChild aria-label={ariaLabel}>
        <Button
          right={
            <Image
              priority
              src="/icons/caret-down.svg"
              width="20"
              height="20"
              alt="Dropdown icon"
            />
          }
        >
          <SelectPrimitive.Value
            placeholder={<Text>{text}</Text>}
            aria-label={value}
          >
            <Text>{`${
              value === undefined ? '' : text.toString() + ': '
            }${label}`}</Text>
          </SelectPrimitive.Value>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={5}
        className="z-50"
      >
        <SelectPrimitive.Viewport className="animate-slide-down cursor-pointer rounded-lg bg-zinc-800 p-2 shadow-lg">
          <SelectPrimitive.Group>
            {options.map(({ label }) => (
              <SelectPrimitive.Item
                key={label}
                value={label}
                className={clsx(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium focus:bg-white/5',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none',
                )}
              >
                <SelectPrimitive.ItemText>
                  <Text>{label}</Text>
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};
