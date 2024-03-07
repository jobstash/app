import { ClassValue } from 'clsx';

import { cn } from '~/shared/utils/cn';

interface Props {
  text: string;
  className?: ClassValue;
  htmlTag?: 'span' | 'p' | 'li';
}

export const Text = ({ text, className, htmlTag }: Props) => {
  const TextTag = htmlTag ?? 'span';

  return (
    <TextTag className={cn(`font-roboto text-sm text-white/70`, className)}>
      {text}
    </TextTag>
  );
};
