import { memo, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { roboto } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

const text = cva(`${roboto.variable} font-roboto antialiased`, {
  variants: {
    fw: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    color: {
      white: 'text-white',
      dimmed: 'text-white/60',
    },
  },
});

type TextVariantProps = VariantProps<typeof text>;

export interface TextProps extends TextVariantProps {
  children: ReactNode;
  className?: string;
}

const Text = ({
  children,
  fw = 'normal',
  size = 'md',
  color = 'white',
  className,
}: TextProps) => (
  <span className={cn(`${text({ fw, size, color })}`, className)}>
    {children}
  </span>
);

export default memo(Text);
