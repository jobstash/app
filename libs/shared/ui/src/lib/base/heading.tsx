import { type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { lato } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

const heading = cva(
  `${lato.className}  antialiased select-none break-words`,
  {
    variants: {
      fw: {
        normal: 'font-normal',
        semibold: 'font-bold',
        bold: 'font-black',
      },
      size: {
        xs: 'text-md',
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
        label: 'text-sm lg:text-md',
      },
      color: {
        white: 'text-white',
        dimmed: 'text-white/75',
      },
    },
  },
);

type HeadingVariantProps = VariantProps<typeof heading>;

interface HeadingProps extends HeadingVariantProps {
  children: ReactNode;
  className?: string;
}

const sizeHeadingMap: Record<
  'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'label',
  'h1' | 'h2' | 'h3' | 'h4' | 'label'
> = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  xs: 'h4',
  label: 'label',
};

const Heading = ({
  children,
  fw = 'bold',
  size = 'xl',
  color = 'white',
  className,
  ...props
}: HeadingProps) => {
  const HeadingTag =
    sizeHeadingMap[(size as keyof typeof sizeHeadingMap) ?? 'xl'];

  return (
    <HeadingTag
      className={cn(heading({ fw, size, color }), className)}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

export default Heading;
