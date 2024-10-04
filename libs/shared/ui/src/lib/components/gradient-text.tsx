import { ClassValue } from 'clsx';

import { cn } from '@jobstash/shared/utils';

type Props = {
  text: string;
  className?: ClassValue;
};

export const GradientText = (props: Props) => {
  const { text, className } = props;

  return (
    <span
      className={cn(
        'bg-gradient-to-r text-transparent bg-clip-text bg-300% animate-gradient from-primary via-[#D68800] to-secondary',
        className,
      )}
    >
      {text}
    </span>
  );
};
