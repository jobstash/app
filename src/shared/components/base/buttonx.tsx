import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { Text } from './textx';

const wrapper = cva(
  [
    'rounded-lg w-fit cursor-pointer border-none p-[1px] active:translate-y-[2px]',
    'transition-color duration-200 ease-in-out',
    'bg-dark-gray hover:bg-gray',
    'active:bg-gradient-to-l active:from-primary active:to-tertiary active:border-transparent [&>*]:active:bg-dark-gray',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-l from-primary to-tertiary hover:from-[#8743FF_52.6%] hover:to-[#4136F1_84.9%] active:from-secondary active:to-secondary [&>*]:active:bg-secondary',
        outline: 'bg-dark hover:bg-dark-gray [&>*]:active:bg-dark',
        subtle: 'bg-dark hover:bg-dark-gray [&>*]:active:bg-dark',
      },
      //
      isActive: {
        true: '',
      },
      isDisabled: {
        true: 'opacity-30 select-none pointer-events-none',
      },
    },
    compoundVariants: [
      {
        variant: undefined,
        isActive: true,
        className:
          'bg-gradient-to-l from-primary to-tertiary [&>*]:bg-dark-gray',
      },
      {
        variant: 'outline',
        isActive: true,
        className: 'bg-gradient-to-l from-primary to-tertiary [&>*]:bg-dark',
      },
      {
        variant: 'primary',
        isActive: true,
        className:
          'bg-gradient-to-l from-secondary to-secondary [&>*]:bg-secondary',
      },
    ],
  },
);

const button = cva(['flex items-center justify-center rounded-lg'], {
  variants: {
    variant: {
      primary: '',
      outline: 'ring-1 ring-gray active:ring-0',
      subtle: '',
    },
    //
    size: {
      sm: 'px-2 py-1',
      md: 'px-4 py-2',
    },

    isActive: {
      true: '',
    },
    isDisabled: {
      true: '',
    },
  },

  compoundVariants: [
    {
      variant: 'outline',
      isActive: true,
      className: 'ring-0 ring-transparent',
    },
  ],
});

type ButtonVariantProps = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariantProps {
  children: ReactNode;
}

export const Button = ({
  children,
  size = 'md',
  isActive = false,
  isDisabled = false,
  variant,
}: ButtonProps) => (
  // <div>{children}</div>
  <div className={wrapper({ variant, isActive, isDisabled })}>
    <button
      type="button"
      className={button({ variant, size, isActive, isDisabled })}
    >
      <Text size={size}>{children as string}</Text>
    </button>
  </div>
);
