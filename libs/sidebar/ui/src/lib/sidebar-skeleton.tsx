import { memo } from 'react';

import { Skeleton } from '@jobstash/shared/ui';

import Brand from './brand';
import SidebarWrapper from './sidebar-wrapper';

const SidebarSkeleton = () => (
  <SidebarWrapper>
    <Brand />

    <div className="flex flex-col gap-4 mt-12">
      <Skeleton className="w-[60px] h-[16px] bg-white/20" />
      <Skeleton className="w-[175px] h-[40px] rounded-md bg-white/20" />
      <Skeleton className="w-[175px] h-[40px] rounded-md bg-white/20" />
      <Skeleton className="w-[175px] h-[40px] rounded-md bg-white/20" />
      <Skeleton className="w-[175px] h-[40px] rounded-md bg-white/20" />
    </div>

    <div className="absolute bottom-5">
      <Skeleton className="w-[175px] h-[40px] rounded-md bg-white/20" />
    </div>
  </SidebarWrapper>
);

export default memo(SidebarSkeleton);
