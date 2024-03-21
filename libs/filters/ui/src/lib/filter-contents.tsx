import { useFiltersContext } from '@jobstash/filters/state';

import DesktopSortFilters from './desktop-sort-filters';
import FilterActions from './filter-actions';
import FilterInputs from './filter-inputs';

export const FilterContents = () => {
  const { showFilters } = useFiltersContext();

  if (!showFilters) return null;

  return (
    <div className="lg:fixed lg:top-[100px] lg:bg-gradient-to-l lg:from-[#141317] lg:to-[#121216] lg:left-[207px] lg:shadow-md lg:p-24">
      <DesktopSortFilters />
      <FilterInputs />
      <FilterActions />
    </div>
  );
};
