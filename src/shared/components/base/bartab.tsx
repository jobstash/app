import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { SidebarIcon } from '../icons';

import { Text } from './text';

const cvaBartab = cva(
  [
    'h-10 rounded-lg flex justify-between w-full items-center hover:bg-greyMedium active:bg-white/20  ',
  ],
  {
    variants: {
      intent: {
        primary: ['px-2 bg-darkerGrey border border-darkerGrey focus:border-white'],
        secondary: ['bg-white/5 px-2 bg-darkGrey border border-darkGrey focus:border-white'],
        wallet:['bg-gradient-to-l from-quaternary to-tertiary border-none [&>span]:bg-darkGrey [&>span]:rounded-lg [&>span]:mx-[2px] [&>span]:h-9 [&>span]:px-2 hover:[&>span]:bg-greyMedium']
      },
      isActive: {
        true: '',
      },
    },
    compoundVariants: [
      { intent: "primary", isActive: true, class: "bg-gradient-to-l from-primary to-secondary" },
      { intent: "secondary", isActive: true, class: "bg-gradient-to-l from-primary to-secondary" },
      { intent: "wallet", isActive: true, class: "[&>span]:bg-transparent hover:[&>span]:bg-transparent" },
    ],
  },
);

type BartabVariantProps = VariantProps<typeof cvaBartab>;

interface BartabProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BartabVariantProps {
  text: string;
  left?: ReactNode;
  isActive?: boolean;
  onClick: MouseEventHandler;
}

export const Bartab = ({
  text,
  left,
  isActive,
  intent,
  onClick,
  ...props
}: BartabProps) => (
  <button
    type="button"
    className={cvaBartab({ intent, isActive })}
    {...props}
    onClick={onClick}
  >
    <span className='flex w-full justify-between'>
      <span className="flex items-center space-x-3">
        {left}
        <Text size="sm" fw="semibold">
          {text}
        </Text>
      </span>
      <SidebarIcon filename="right-caret" />
    </span>
  </button>
);
