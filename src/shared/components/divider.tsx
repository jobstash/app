import { ClassValue } from 'clsx';

import { cn } from '~/shared/utils/cn';

interface Props {
  className?: ClassValue;
}

export const Divider = ({ className }: Props) => {
  return (
    <div className={cn('flex h-4 items-center', className)}>
      <hr className="w-full border-t border-white/10" />
    </div>
  );
};
