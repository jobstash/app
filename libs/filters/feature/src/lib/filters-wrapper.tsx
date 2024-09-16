import { ReactNode, useEffect, useState } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { isOpenTopBannerAtom } from '@jobstash/shared/state';

interface Props {
  children: ReactNode;
}

const FiltersWrapper = ({ children }: Props) => {
  const [, setShowFilters] = useAtom(showFiltersAtom);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        if (
          currentScrollTop > lastScrollTop &&
          currentScrollTop - lastScrollTop > HIDE_THRESHOLD
        ) {
          setShowFilters(false);
        }

        setLastScrollTop(currentScrollTop);
      }, DEBOUNCE_MS);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [lastScrollTop, setShowFilters]);

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <div
      className={cn(
        'fixed left-0 right-0 px-4 flex flex-col py-4 gap-y-4 bg-[#121216] z-40 transition-all duration-1000 lg:px-8 lg:items-center lg:py-0 lg:gap-x-4 lg:pt-0 lg:flex-row lg:relative lg:flex lg:right-auto lg:left-auto',
        { 'top-[108px] sm:top-[90px] lg:top-0': isOpenTopBanner },
      )}
    >
      {children}
    </div>
  );
};

export default FiltersWrapper;

const DEBOUNCE_MS = 100;
const HIDE_THRESHOLD = 200;
