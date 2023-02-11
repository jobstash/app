import Image from 'next/image';
import { ReactNode } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { Button } from './button';

interface RadixMenuItem {
  label: string;
  icon?: ReactNode;
}

interface Props {
  /** Button text */
  text: string;
  items: RadixMenuItem[];
}

export const Dropdown = ({ text, items }: Props) => (
  <DropdownMenuPrimitive.Root>
    <DropdownMenuPrimitive.Trigger asChild>
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
        {text}
      </Button>
    </DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content className="">
        {items.map(({ label, icon }) => (
          <DropdownMenuPrimitive.Item key={label} className="">
            <div className="">{icon}</div>
            <span className="">{label}</span>
          </DropdownMenuPrimitive.Item>
        ))}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);
