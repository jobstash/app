import { DetailsPanelCardSkeleton } from './card-skeleton';
import { DetailsPanelHeaderSkeleton } from './header-skeleton';
import { DetailsPanelTabsSkeleton } from './tabs';

export const DetailsPanelSkeleton = () => {
  return (
    <>
      <DetailsPanelHeaderSkeleton />
      <DetailsPanelTabsSkeleton />
      <DetailsPanelCardSkeleton />
    </>
  );
};
