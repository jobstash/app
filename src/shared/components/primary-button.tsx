import { Button, ButtonProps } from '@nextui-org/button';
import { ClassValue } from 'clsx';

import { cn } from '~/shared/utils/cn';

interface Props extends ButtonProps {
  text: string;
  classNames?: {
    button?: ClassValue;
    text?: ClassValue;
  };
}

export const PrimaryButton = ({ text, classNames, ...props }: Props) => {
  return (
    <Button
      className={cn(
        'flex items-center rounded-lg bg-gradient-to-l from-[#8743FF] to-[#4136F1] p-2 px-4',
        classNames?.button,
      )}
      {...props}
    >
      <span
        className={cn(
          'shrink-0 text-xs font-semibold sm:text-sm',
          classNames?.text,
        )}
      >
        {text}
      </span>
    </Button>
  );
};
