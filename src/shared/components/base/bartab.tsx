import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { CaretLeftSidebarIcon } from '../icons';

import Text from './text';

const bartab = cva(['h-10 w-full border-none rounded-lg p-[1px]'], {
  variants: {
    variant: {
      bartab: 'bg-darker-gray hover:bg-dark-gray',
      wallet:
        'bg-gradient-to-r from-primary to-quaternary hover:via-[#C77B31] hover:to-quaternary',
    },
    isActive: {
      true: '',
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
        wallet: '',
      },
      isActive: {
        true: '',
      },
    },
    compoundVariants: [
      {
        variant: 'wallet',
        isActive: true,
        className: 'bg-transparent',
      },
      {
        variant: 'wallet',
        isActive: false,
        className: 'bg-dark hover:bg-dark-gray active:bg-transparent',
      },
    ],
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

const Bartab = forwardRef<HTMLButtonElement, BartabProps>(
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
        <div className={inner({ variant, isActive })}>
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

export default Bartab;
