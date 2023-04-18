import { memo } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { roboto } from '~/shared/core/constants';

const text = cva(`${roboto.variable} font-roboto antialiased`, {
  variants: {
    fw: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-bold',
      bold: 'font-black',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    color: {
      white: 'text-white',
      dimmed: 'text-white/75',
    },
  },
});

type TextVariantProps = VariantProps<typeof text>;

interface TextProps extends TextVariantProps {
  children: string;
}

const Text = ({
  children,
  fw = 'normal',
  size = 'md',
  color = 'white',
  ...props
}: TextProps) => <span className={text({ fw, size, color })}>{children}</span>;

export default memo(Text);
