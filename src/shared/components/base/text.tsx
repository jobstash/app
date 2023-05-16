import { memo } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { roboto } from '~/shared/core/constants';

const text = cva(
  `${roboto.variable} font-roboto antialiased inline-block text-left`,
  {
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
        dimmed: 'text-white/50',
      },
    },
  },
);

type TextVariantProps = VariantProps<typeof text>;

export interface TextProps extends TextVariantProps {
  children: string;
  className?: string;
}

const Text = ({
  children,
  fw = 'normal',
  size = 'md',
  color = 'white',
  className,
}: TextProps) => (
  <span className={`${text({ fw, size, color })} ${className}`}>
    {children}
  </span>
);

export default memo(Text);
