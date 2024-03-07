import { ClassValue } from 'clsx';

import { capitalize } from '~/shared/utils/capitalize';
import { cn } from '~/shared/utils/cn';

interface Props {
  text: string;
  className?: ClassValue;
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export const Heading = ({ text, className, htmlTag }: Props) => {
  const HeadingTag = htmlTag ?? 'h2';

  return (
    <HeadingTag className={cn(`font-lato text-xl font-bold`, className)}>
      {capitalize(text)}
    </HeadingTag>
  );
};
