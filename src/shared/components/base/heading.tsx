import { cva, VariantProps } from 'class-variance-authority';

import { lato } from '~/shared/core/constants';

const heading = cva(`${lato.variable} font-lato antialiased`, {
  variants: {
    fw: {
      normal: 'font-normal',
      semibold: 'font-bold',
      bold: 'font-black',
    },
    size: {
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
});

type HeadingVariantProps = VariantProps<typeof heading>;

interface HeadingProps extends HeadingVariantProps {
  children: string;
}

const sizeHeadingMap: Record<
  'xl' | 'lg' | 'md' | 'sm' | 'label',
  'h1' | 'h2' | 'h3' | 'h4' | 'label'
> = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  label: 'label',
};

const Heading = ({
  children,
  fw = 'bold',
  size = 'xl',
  color = 'white',
  ...props
}: HeadingProps) => {
  const HeadingTag =
    sizeHeadingMap[(size as keyof typeof sizeHeadingMap) ?? 'xl'];

  return (
    <HeadingTag className={heading({ fw, size, color })} {...props}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
