import {
  type ButtonHTMLAttributes,
  forwardRef,
  memo,
  type ReactNode,
} from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

import Text from './text';

const bartab = cva(['h-10 w-full border-none rounded-lg p-[2px]'], {
  variants: {
    variant: {
      bartab: 'bg-darker-gray transition-all hover:bg-dark-gray',
      wallet:
        'bg-gradient-to-r from-primary to-quaternary hover:via-[#C77B31] hover:to-quaternary',
    },
    isActive: {
      true: '',
    },
    isDisabled: {
      true: 'opacity-30 pointer-events-none animate-pulse',
    },
  },
  compoundVariants: [
    {
      variant: 'bartab',
      isActive: true,
      className: 'bg-gradient-to-l from-primary to-tertiary',
    },
  ],
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
  children: ReactNode;
  left?: ReactNode;
  isDisabled?: boolean;
}

const Bartab = forwardRef<HTMLButtonElement, BartabProps>(
  (
    {
      children,
      left = null,
      variant = 'bartab',
      isActive,
      isDisabled,
      ...props
    }: BartabProps,
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(bartab({ variant, isActive, isDisabled }))}
      disabled={isDisabled}
    >
      <div className={cn(inner({ variant, isActive }))}>
        {left}
        <div
          className={cn(
            'flex grow items-center',
            { 'justify-start': Boolean(left) },
            { 'lg:justify-start lg:pl-0.5': !left },
            { 'lg:justify-center': variant === 'wallet' },
          )}
        >
          {typeof children === 'string' ? (
            <Text fw="medium">{children}</Text>
          ) : (
            children
          )}
        </div>
      </div>
    </button>
  ),
);

Bartab.displayName = 'Bartab';

export default memo(Bartab);
