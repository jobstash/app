import { Skeleton } from '@nextui-org/skeleton';

export const ParagraphSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-1">
      <Skeleton className="h-3 w-full rounded-md" />
      <Skeleton className="h-3 w-11/12 rounded-md" />
      <Skeleton className="h-3 w-8/12 rounded-md" />
    </div>
  );
};
