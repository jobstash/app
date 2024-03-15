import { cn } from '@jobstash/shared/utils';

import { Loader } from '@jobstash/shared/ui';

interface Props {
  className?: string;
}

export const LoadingSection = ({ className }: Props) => (
  <div
    className={cn('flex w-full items-center justify-center h-40', className)}
  >
    <Loader />
  </div>
);
