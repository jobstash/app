import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

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
  text: string;
  left?: ReactNode;
  right?: ReactNode;
}

const Bartab = forwardRef<HTMLButtonElement, BartabProps>(
  (
    { text, left = null, variant = 'bartab', isActive, ...props }: BartabProps,
    ref,
  ) => {
    const isTextOnly = !left;

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
        </div>
      </button>
    );
  },
);

Bartab.displayName = 'Bartab';

export default Bartab;
