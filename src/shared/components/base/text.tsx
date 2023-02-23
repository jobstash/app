import { type ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

const cvaText = cva([], {
  variants: {
    fw: {
      regular: 'font-regular',
      medium: 'font-medium antialiased',
      semibold: 'font-semibold antialiased',
      bold: 'font-bold antialiased',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    color: {
      white: 'text-white',
      normal: 'text-white/90',
      dimmed: 'text-white/70',
    },
  },
});

type TextVariantProps = VariantProps<typeof cvaText>;

export interface TextProps extends TextVariantProps {
  children: ReactNode;
  htmlTag?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
}

export const Text = ({
  children,
  fw = 'medium',
  size = 'md',
  color = 'normal',
  htmlTag = 'span',
  className,
  ...props
}: TextProps) => {
  const HtmlTag = htmlTag;

  return (
    <HtmlTag
      className={`${cvaText({ fw, size, color })} ${className}`}
      {...props}
    >
      {children}
    </HtmlTag>
  );
};
