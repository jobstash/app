import { Skeleton } from '@nextui-org/skeleton';

import { Divider } from '~/shared/components/divider';
import { InfoTagsSkeleton } from '~/shared/components/info-tags';
import { ParagraphSkeleton } from '~/shared/components/paragraph-skeleton';

import { DetailsPanelActionsWrapper } from './actions-wrapper';
import { DetailsPanelCardWrapper } from './card-wrapper';

export const DetailsPanelCardSkeleton = () => {
  return (
    <DetailsPanelCardWrapper isPrimary={false}>
      <Skeleton className="h-6 w-56 rounded-md" />
      <InfoTagsSkeleton count={5} />
      <DetailsPanelActionsWrapper>
        <Skeleton className="h-9 w-28 rounded-lg md:w-36" />
        <div className="flex justify-end gap-2.5">
          <Skeleton className="size-10 rounded-md" />
          <Skeleton className="size-10 rounded-md" />
        </div>
      </DetailsPanelActionsWrapper>
      <Divider />

      <div className="flex flex-col gap-6">
        <DescriptionSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </DetailsPanelCardWrapper>
  );
};

const DescriptionSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-4 w-24 rounded-md" />
    <ParagraphSkeleton />
  </div>
);

const ListSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-4 w-24 rounded-md" />
    <div className="flex flex-col gap-3 p-1 pl-6">
      <Skeleton className="h-3 w-full rounded-md md:w-7/12" />
      <Skeleton className="h-3 w-10/12 rounded-md md:w-6/12" />
      <Skeleton className="h-3 w-7/12 rounded-md md:w-5/12" />
      <Skeleton className="h-3 w-9/12 rounded-md md:w-6/12" />
      <Skeleton className="h-3 w-6/12 rounded-md md:w-4/12" />
    </div>
  </div>
);
