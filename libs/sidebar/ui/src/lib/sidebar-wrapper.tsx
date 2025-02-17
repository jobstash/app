import { memo, type ReactNode } from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';
import { useSidebarContext } from '@jobstash/sidebar/state';

interface Props {
  children: ReactNode;
}

const SidebarWrapper = ({ children }: Props) => {
  const { sidebarOpen } = useSidebarContext();

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <nav
      className={cn(
        'fixed left-0 z-50 flex flex-wrap lg:flex-nowrap  w-full justify-between bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:flex-col lg:justify-start lg:border-r lg:border-white/5 lg:bg-transparent',
        { 'z-[60]': sidebarOpen },
        { '': isOpenTopBanner },
      )}
    >
      {children}
    </nav>
  );
};

export default memo(SidebarWrapper);
