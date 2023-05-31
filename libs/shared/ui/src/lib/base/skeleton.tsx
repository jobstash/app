import { type HTMLAttributes, memo } from 'react';

import { cn } from '@jobstash/shared/utils';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

export default memo(Skeleton);
