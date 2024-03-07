import { DraggableWrapper } from '~/shared/components/draggable-wrapper';

import { DetailsPanelTabSkeleton } from './tab';
import { DetailsPanelTabMapper } from './tab-mapper';

interface Props {
  tabs: { text: string; href: string }[];
  asyncTabs?: React.ReactNode;
}

export const DetailsPanelTabs = ({ tabs, asyncTabs }: Props) => {
  return (
    <DraggableWrapper className={ROW_CLASSNAME}>
      <DetailsPanelTabMapper tabs={tabs} />
      {asyncTabs}
    </DraggableWrapper>
  );
};

const ROW_CLASSNAME = 'flex items-center gap-4';

interface SkeletonProps {
  count?: number;
}

export const DetailsPanelTabsSkeleton = ({ count = 4 }: SkeletonProps) => (
  <DraggableWrapper className={ROW_CLASSNAME}>
    {Array.from({ length: count }).map((_, i) => (
      <DetailsPanelTabSkeleton key={i} />
    ))}
  </DraggableWrapper>
);
