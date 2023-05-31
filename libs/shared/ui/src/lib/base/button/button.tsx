import {
  type ButtonHTMLAttributes,
  forwardRef,
  memo,
  type ReactNode,
} from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

import Text, { TextProps } from '../text';

import ButtonWrapper from './button-wrapper';

export const buttonVariants = cva(
  [
    'flex items-center justify-center z-20 relative rounded-lg whitespace-nowrap gap-x-2',
  ],
  {
    variants: {
      variant: {
        default: '',
        primary: '',
        outline: 'ring-1 ring-gray active:ring-0',
        subtle: '',
        translucent: '',
        transparent: '',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
      },
      isActive: {
        true: '',
      },
      isBordered: {
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
        true: 'w-9 h-9',
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
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonHTMLProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>;

export interface ButtonProps extends ButtonHTMLProps, ButtonVariantProps {
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  textProps?: Omit<TextProps, 'children'>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      isBordered,
      textProps,
      ...props
    }: ButtonProps,
    ref,
  ) => (
    <ButtonWrapper
      variant={variant}
      isActive={isActive}
      isDisabled={isDisabled}
      isFullWidth={isFullWidth}
      isBordered={isBordered}
    >
      <button
        ref={ref}
        type="button"
        className={cn(
          buttonVariants({
            variant,
            size,
            isActive,
            isDisabled,
            hasLeft: Boolean(left),
            hasRight: Boolean(right),
            isIcon,
            isFullWidth,
            isBordered,
          }),
        )}
        {...props}
      >
        {left ?? null}
        <Text size={size} {...textProps}>
          {children as string}
        </Text>
        {right ?? null}
      </button>
    </ButtonWrapper>
  ),
);

Button.displayName = 'Button';

export default memo(Button);
