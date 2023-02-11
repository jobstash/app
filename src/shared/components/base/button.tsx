import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { type TextProps, Text } from './text';

const cvaButton = cva(
  [
    'rounded-md flex items-center transition duration-150 ease-in-out space-x-1',
    'hover:opacity-95 focus:opacity-85 active:opacity-75 active:scale-[.95]',
  ],
  {
    variants: {
      kind: {
        default: 'bg-white/10',
        primary: 'bg-gradient-to-l from-primary to-secondary',
        outlined: 'bg-none border border-white/20',
        subtle: 'bg-none',
      },
      isActive: {
        // Transition-none gets rid of weird blink
        true: 'transition-none bg-card',
      },
      isDisabled: {
        true: 'pointer-events-none select-none opacity-60',
      },
      hasLeft: {
        true: '',
      },
      hasRight: {
        true: '',
      },
      size: {
        xs: 'py-0.5 px-1',
        sm: 'py-1 px-2',
        md: 'py-1.5 px-3',
        lg: 'py-2.5 px-5',
      },
    },
    compoundVariants: [
      {
        hasLeft: true,
        size: 'sm',
        className: 'pl-1',
      },
      {
        hasLeft: true,
        size: 'md',
        className: 'pl-2',
      },
      {
        hasLeft: true,
        size: 'lg',
        className: 'pl-4',
      },
      {
        hasRight: true,
        size: 'sm',
        className: 'pr-1',
      },
      {
        hasRight: true,
        size: 'md',
        className: 'pr-2',
      },
      {
        hasRight: true,
        size: 'lg',
        className: 'pr-4',
      },
      {
        // Disable active border on primary
        kind: 'primary',
        isActive: true,
        className: 'border-none',
      },
    ],
  },
);

type ButtonVariantProps = VariantProps<typeof cvaButton>;

type ButtonHTMLProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>;

export interface ButtonProps extends ButtonHTMLProps, ButtonVariantProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  textProps?: Omit<TextProps, 'children'>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      kind = 'default',
      isActive = false,
      isDisabled = false,
      size = 'md',
      children,
      left,
      right,
      textProps,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const btn = (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cvaButton({
          kind,
          isActive,
          isDisabled,
          size,
          hasLeft: Boolean(left),
          hasRight: Boolean(right),
        })}
        {...props}
      >
        {left}
        <Text size={textProps?.size ?? 'sm'} {...textProps}>
          {children}
        </Text>
        {right}
      </button>
    );

    if (!isActive) return btn;

    return (
      <div className="flex items-center justify-center rounded-md bg-gradient-to-l from-primary to-secondary p-0.5">
        {btn}
      </div>
    );
  },
);

Button.displayName = 'Button';
