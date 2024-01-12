import { memo, type ReactNode } from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';
import { sidebarOpenAtom } from '@jobstash/sidebar/state';

interface Props {
  children: ReactNode;
}

const MobileNavbarWrapper = ({ children }: Props) => {
  const sidebarOpen = useAtomValue(sidebarOpenAtom);
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <nav
      className={cn(
        'fixed inset-0 w-full bg-opacity-75 bg-gradient-to-l from-[#8743FF] to-[#4136F1] p-4 transition-all duration-300 lg:hidden flex flex-col gap-6',
        { 'pt-[72px]': isOpenTopBanner },
        { 'z-50 opacity-100 overflow-auto h-screen': sidebarOpen },
        {
          '-z-50 opacity-0 h-0 overflow-hidden pointer-events-none':
            !sidebarOpen,
        },
      )}
    >
      {children}
    </nav>
  );
};

export default memo(MobileNavbarWrapper);
