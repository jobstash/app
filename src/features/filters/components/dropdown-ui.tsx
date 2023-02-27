import Image from 'next/image';
import { type ReactNode } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Button, Text } from '~/shared/components';

interface Props {
  text: string;
  children: ReactNode;
}

/**
 * Reusable dropdown component.
 * Differs from single-select since it gives more control on rendered items
 */
export const DropdownUi = ({ text, children }: Props) => (
  <Dropdown.Root>
    <Dropdown.Trigger asChild>
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
        <Text>{text}</Text>
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Portal>
      <Dropdown.Content
        align="start"
        sideOffset={5}
        className={clsx(
          'radix-side-bottom:animate-slide-down radix-side-top:animate-slide-up',
          'min-w-[180px] rounded-lg px-1.5 py-1 shadow-md',
          'bg-zinc-800',
        )}
      >
        {children}
      </Dropdown.Content>
    </Dropdown.Portal>
  </Dropdown.Root>
);
