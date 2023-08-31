import { memo, type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
  sidebarOpen?: boolean;
}

const SidebarWrapper = ({ children, sidebarOpen }: Props) => (
  <nav
    className={cn(
      'fixed left-0 z-50 flex h-[65px] w-full justify-between bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:flex-col lg:justify-start lg:border-r lg:border-white/5 lg:bg-transparent',
      { 'z-[100]': sidebarOpen },
      // { 'mt-4 sm:mt-0 lg:pt-10': true }, // Only when top-banner is visible
    )}
  >
    {children}
  </nav>
);

export default memo(SidebarWrapper);
