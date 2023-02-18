import Image from 'next/image';
import { type Dispatch } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';

import { Button, Text } from '~/shared/components';

import type { Action, ConfigLabeledValue } from '../core/types';

/**
 * We need to use generics since underlying value type might differ for different cases
 * For example in FilterKind.DATE, values would be number for unix timestamps,
 * There might be a usecase in the future where underlying values might be different than numbers
 * Hence generics:
 * 	`C` = filter config e.g. `JobsFilterConfig`
 * 	`P` = type of filter param e.g. `number` for FilterKind.DATE
 */
interface Props<C extends Object, P> {
  text: string;
  ariaLabel: string;
  items: ConfigLabeledValue<P>[];
  type: keyof C;
  dispatch: Dispatch<Action<C, P>>;
}

/**
 * Dropdown where users can select a single item
 * Each item has an associated label and value to it
 * `label` is what's displayed in the ui
 * `value` will be the filter param for the final url query
 */
export const SingleSelectFilter = <C extends Object, P>({
  text,
  items,
  ariaLabel,
  type,
  dispatch,
}: Props<C, P>) => {
  const dispatchFn = (label: string) => {
    const item = items.find((item) => item.label === label);
    if (!item) return;

    dispatch({ type, payload: item.value });
  };

  return (
    <SelectPrimitive.Root onValueChange={(label) => dispatchFn(label)}>
      <SelectPrimitive.Trigger asChild aria-label={ariaLabel}>
        <Button
          right={
            <Image
              priority
              src="/icons/caret-down.png"
              width="20"
              height="20"
              alt="Dropdown icon"
            />
          }
        >
          <SelectPrimitive.Value placeholder={<Text>{text}</Text>} />
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content position="popper" sideOffset={5}>
        <SelectPrimitive.Viewport className="animate-slide-down cursor-pointer rounded-lg bg-zinc-800 p-2 shadow-lg">
          <SelectPrimitive.Group>
            {items.map(({ label }) => (
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
