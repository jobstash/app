import Image from 'next/image';
import { ReactNode } from 'react';

import { Lato } from '@next/font/google';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Button } from './button';
import { Text } from './text';
interface RadixMenuItem {
  label: string;
  icon?: ReactNode;
}

interface Props {
  /** Button text */
  text: string;
  items: RadixMenuItem[];
}

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const Dropdown = ({ text, items }: Props) => (
  <div className="relative inline-block text-left">
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
        <DropdownMenuPrimitive.Content
          align="start"
          sideOffset={5}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56',
            'bg-white/10',
          )}
        >
          {items.map(({ label, icon }) => (
            <DropdownMenuPrimitive.Item
              key={label}
              className={clsx(
                'flex cursor-pointer select-none items-center rounded-md p-2 text-xs outline-none',
                'focus:bg-white/10',
              )}
            >
              <div className="">{icon}</div>
              <div>
                <Text className={`${lato.variable} font-sans`}>{label}</Text>
              </div>
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  </div>
);

const x = Number.POSITIVE_INFINITY;
