import { ReactNode, useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { useIsMobile } from '@jobstash/shared/state';

interface Props {
  children: ReactNode;
}

const FiltersWrapper = ({ children }: Props) => {
  const isMobile = useIsMobile();
  const showFilters = useAtomValue(showFiltersAtom);

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

  const [topLarge, setTopLarge] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'up') {
      setTopLarge(showFilters);
    }
  }, [scrollDirection, showFilters]);

  return (
    <div
      className={cn(
        'bg-[#121216] z-50 sticky py-4 pr-2 transition-all duration-1000 top-16 lg:top-0',
        {
          '-top-60 sm:-top-44 lg:-top-44':
            scrollDirection === 'down' && !showFilters,
        },
        {
          '-top-[100%] sm:-top-[75%] lg:-top-[75%]':
            scrollDirection === 'down' && topLarge,
        },
        { 'w-[calc(100%+32px)]': showFilters && !isMobile },
      )}
    >
      {children}
    </div>
  );
};

export default FiltersWrapper;
