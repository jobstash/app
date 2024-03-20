import { ReactNode, useEffect, useState } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { isOpenTopBannerAtom, useIsMobile } from '@jobstash/shared/state';

interface Props {
  children: ReactNode;
}

const FiltersWrapper = ({ children }: Props) => {
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useAtom(showFiltersAtom);

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const isLargerOffset = showFilters && scrollDirection === 'up';
    const diffOffset = isLargerOffset ? 30 : 15;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > diffOffset ||
          scrollY - lastScrollY < -diffOffset)
      ) {
        setScrollDirection(direction);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection, showFilters]);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    if (scrollDirection === 'down' && showFilters) {
      hideTimeout = setTimeout(() => setShowFilters(false), 300);
    }

    return () => clearTimeout(hideTimeout);
  }, [scrollDirection, setShowFilters, showFilters]);

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <div
      className={cn(
        'fixed left-0 right-0 px-4 flex flex-col py-4 gap-y-4 bg-[#121216] z-40 transition-all duration-1000 lg:px-8 lg:items-center lg:py-0 lg:gap-x-4 lg:pt-0 lg:flex-row lg:relative lg:flex lg:right-auto lg:left-auto',
        { 'top-[108px] sm:top-[92px] lg:top-10': isOpenTopBanner },
        // {
        //   '-top-60 lg:-top-44': scrollDirection === 'down' && !showFilters,
        // },
        // { 'w-[calc(100%+32px)] overflow-x-hidden': showFilters && !isMobile },
      )}
    >
      {children}
    </div>
  );
};

export default FiltersWrapper;
