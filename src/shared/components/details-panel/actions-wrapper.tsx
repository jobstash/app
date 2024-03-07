import { ClassValue } from 'clsx';

import { cn } from '~/shared/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: ClassValue;
}

export const DetailsPanelActionsWrapper = ({ children, className }: Props) => {
  return (
    <div className={cn('flex h-10 justify-between [&>*]:h-full', className)}>
      {children}
    </div>
  );
};
