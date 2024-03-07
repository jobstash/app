import { Skeleton } from '@nextui-org/skeleton';

import { Divider } from '~/shared/components/divider';

export const JobCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-darkest-gray p-6">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-6 w-9/12 rounded-md md:w-6/12" />
        <Skeleton className="h-6 w-2/12 rounded-md" />
      </div>
      <Skeleton className="h-6 w-6/12 rounded-md md:w-9/12" />
      <Divider />
      <Skeleton className="h-36 w-full rounded-xl" />
      <Divider />
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-4/12 rounded-md" />
        <Skeleton className="h-8 w-3/12 rounded-md md:w-2/12" />
        <Skeleton className="h-8 w-3/12 rounded-md md:w-2/12" />
      </div>
    </div>
  );
};
