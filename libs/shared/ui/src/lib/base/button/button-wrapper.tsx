import { memo, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

const wrapper = cva(
  [
    'rounded-lg w-fit cursor-pointer p-[1px] m-[1px]',
    'transition-color duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-dark-gray hover:bg-gray active:bg-gradient-to-l active:from-primary active:to-tertiary active:border-transparent [&>*]:active:bg-dark-gray',
        primary:
          'relative bg-gradient-to-l from-primary to-tertiary before:duration-200 before:ease-linear before:transition-all before:z-0 before:block before:absolute before:inset-0 before:content-[""] before:bg-gradient-to-l before:from-primary before:from-55% before:to-tertiary before:to-85%  before:opacity-0 before:z-0 before:rounded-lg hover:before:opacity-100 active:before:opacity-0 active:from-secondary active:to-secondary',
        outline:
          'bg-dark hover:bg-dark-gray [&>*]:active:bg-dark ring-1 ring-gray active:ring-0',
        subtle: 'bg-dark hover:bg-dark-gray [&>*]:active:bg-dark',
        translucent: 'bg-white/10 hover:bg-white/20 active:bg-white/30',
        transparent: '',
      },
      isActive: {
        true: '',
      },
      isBordered: {
        true: 'border border-white',
        false: 'border-none',
      },
      isDisabled: {
        true: 'opacity-60 select-none pointer-events-none',
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

type ButtonWrapperVariantProps = VariantProps<typeof wrapper>;

interface ButtonWrapperProps extends ButtonWrapperVariantProps {
  children: ReactNode;
}

const ButtonWrapper = ({
  children,
  variant,
  isActive,
  isDisabled,
  isFullWidth,
  isBordered,
}: ButtonWrapperProps) => (
  <div
    className={wrapper({
      variant,
      isActive,
      isDisabled,
      isFullWidth,
      isBordered,
    })}
  >
    {children}
  </div>
);

export default memo(ButtonWrapper);
