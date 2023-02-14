import Image from 'next/image';

import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';

import { Button } from './button';
import { Text } from './text';

type Props = {
  items: string[];
  ariaLabel: string;
};

export const Select = ({ items, ariaLabel }: Props) => (
  <SelectPrimitive.Root>
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
        <SelectPrimitive.Value placeholder={<Text>Level</Text>} />
      </Button>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Content position="popper" sideOffset={5}>
      <SelectPrimitive.Viewport className="animate-slide-down cursor-pointer rounded-lg bg-white/10 p-2 shadow-lg">
        <SelectPrimitive.Group>
          {items.map((item) => (
            <SelectPrimitive.Item
              key={item}
              value={item}
              className={clsx(
                'relative flex items-center rounded-md px-8 py-2 text-sm font-medium focus:bg-white/5',
                'radix-disabled:opacity-50',
                'select-none focus:outline-none',
              )}
            >
              <SelectPrimitive.ItemText>
                <Text>{item}</Text>
              </SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Group>
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Root>
);
