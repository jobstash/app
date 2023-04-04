import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { CaretLeftSidebarIcon } from '../icons';

import { Text } from './text';

const bartab = cva(['h-10 w-full border-none rounded-lg p-[1px]'], {
  variants: {
    variant: {
      bartab: 'bg-darker-gray hover:bg-dark-gray',
      wallet:
        'bg-gradient-to-r from-primary/60 to-quaternary/80 hover:from-primary hover:to-quaternary/80',
      //
      // wallet: 'bg-gradient-to-l from-[#8743FF_60%] to-[D68800_80%]',
    },
    isActive: {
      //
      // true: 'bg-gradient-to-l from-[#8743FF_0%] to-[#4136F1_100%]',
      true: 'bg-gradient-to-l from-primary to-tertiary hover:brightness-110',
    },
  },
});

const inner = cva(
  [
    'flex items-center justify-center p-2 gap-[10px] rounded-lg h-full',
    'transition-color duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        bartab: '',
        wallet: 'bg-dark hover:bg-dark-gray active:bg-transparent',
      },
    },
  },
);

type BartabVariantProps = VariantProps<typeof bartab>;

type ButtonHTMLProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>;

interface BartabProps extends ButtonHTMLProps, BartabVariantProps {
  text: string;
  left?: ReactNode;
  right?: ReactNode;
}

export const Bartab = forwardRef<HTMLButtonElement, BartabProps>(
  (
    {
      text,
      left = null,
      right = <CaretLeftSidebarIcon />,
      variant = 'bartab',
      isActive,
      ...props
    }: BartabProps,
    ref,
  ) => {
    const isTextOnly = !left && !right;

    return (
      <button ref={ref} {...props} className={bartab({ variant, isActive })}>
        <div className={inner({ variant })}>
          {left}
          <div
            className={clsx(
              'flex grow items-center',
              { 'justify-start': !isTextOnly },
              { 'justify-center': isTextOnly },
            )}
          >
            <Text fw="medium">{text}</Text>
          </div>
          {right}
        </div>
      </button>
    );
  },
);

Bartab.displayName = 'Bartab';
