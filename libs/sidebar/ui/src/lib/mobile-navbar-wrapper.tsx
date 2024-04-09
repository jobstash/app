import { memo, type ReactNode } from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import {
  isOpenFullscreenNavAtom,
  isOpenTopBannerAtom,
} from '@jobstash/shared/state';

interface Props {
  children: ReactNode;
}

const MobileNavbarWrapper = ({ children }: Props) => {
  const isOpenNav = useAtomValue(isOpenFullscreenNavAtom);
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <nav
      className={cn(
        'fixed z-[99] inset-0 max-h-full w-full bg-opacity-75 bg-gradient-to-l from-[#8743FF] to-[#4136F1] p-4 transition-all duration-300 lg:hidden flex flex-col gap-6',
        { 'pt-[72px]': isOpenTopBanner },
        { ' opacity-100 overflow-auto h-screen': isOpenNav },
        {
          'opacity-0 h-0 overflow-hidden pointer-events-none': !isOpenNav,
        },
      )}
    >
      {children}
    </nav>
  );
};

export default memo(MobileNavbarWrapper);
