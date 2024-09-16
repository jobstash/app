import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { useFiltersContext } from '@jobstash/filters/state';
import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import DesktopSortFilters from './desktop-sort-filters';
import FilterActions from './filter-actions';
import FilterInputs from './filter-inputs';

export const FilterContents = () => {
  const { showFilters } = useFiltersContext();
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  if (!showFilters) return null;

  return (
    <div
      className={cn(
        'lg:fixed lg:top-[100px] lg:right-0 lg:bg-gradient-to-l lg:from-[#141317] lg:to-[#121216] lg:left-[207px] lg:shadow-md lg:py-5 lg:px-8',
        { 'lg:top-[140px]': isOpenTopBanner },
      )}
    >
      <DesktopSortFilters />
      <FilterInputs />
      <FilterActions />
    </div>
  );
};
