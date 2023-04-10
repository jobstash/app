import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { Text } from './text';

const wrapper = cva(
  [
    'rounded-lg w-fit cursor-pointer border-none p-[1px] active:translate-y-[2px]',
    'transition-color duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-dark-gray hover:bg-gray active:bg-gradient-to-l active:from-primary active:to-tertiary active:border-transparent [&>*]:active:bg-dark-gray',
        primary:
          'bg-gradient-to-l from-primary to-tertiary hover:from-[#8743FF_52.6%] hover:to-[#4136F1_84.9%] active:from-secondary active:to-secondary [&>*]:active:bg-secondary',
        outline: 'bg-dark hover:bg-dark-gray [&>*]:active:bg-dark',
        subtle: 'bg-dark hover:bg-dark-gray [&>*]:active:bg-dark',
        translucent: 'bg-white/10 hover:bg-white/20 active:bg-white/30',
      },
      isActive: {
        true: '',
      },
      isDisabled: {
        true: 'opacity-30 select-none pointer-events-none',
      },
      isFullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
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

const button = cva(['flex items-center justify-center rounded-lg gap-x-1'], {
  variants: {
    variant: {
      default: '',
      primary: '',
      outline: 'ring-1 ring-gray active:ring-0',
      subtle: '',
      translucent: '',
    },
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
    hasLeft: {
      true: '',
    },
    hasRight: {
      true: '',
    },
    isIcon: {
      true: 'w-7 h-7',
    },
    isFullWidth: {
      true: 'w-full justify-between',
    },
  },

  compoundVariants: [
    {
      variant: 'outline',
      isActive: true,
      className: 'ring-0 ring-transparent hover:bg-dark-gray',
    },
    {
      hasLeft: true,
      size: 'md',
      className: 'pl-2',
    },
    {
      hasLeft: true,
      size: 'sm',
      className: 'pl-1',
    },
    {
      hasRight: true,
      size: 'md',
      className: 'pr-2',
    },
    {
      hasRight: true,
      size: 'sm',
      className: 'pr-1',
    },
  ],
});

type ButtonVariantProps = VariantProps<typeof button>;

type ButtonHTMLProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>;

interface ButtonProps extends ButtonHTMLProps, ButtonVariantProps {
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = 'md',
      isActive = false,
      isDisabled = false,
      variant = 'default',
      left,
      right,
      isIcon = false,
      isFullWidth,
      ...props
    }: ButtonProps,
    ref,
  ) => (
    <div className={wrapper({ variant, isActive, isDisabled, isFullWidth })}>
      <button
        ref={ref}
        type="button"
        className={button({
          variant,
          size,
          isActive,
          isDisabled,
          hasLeft: Boolean(left),
          hasRight: Boolean(right),
          isIcon,
          isFullWidth,
        })}
        {...props}
      >
        {left ?? null}
        <Text size={size}>{children as string}</Text>
        {right ?? null}
      </button>
    </div>
  ),
);

Button.displayName = 'Button';
