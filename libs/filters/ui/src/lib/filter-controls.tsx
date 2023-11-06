import { memo } from 'react';

import DesktopSortFilters from './desktop-sort-filters';
import FiltersItemsCount from './filters-items-count';
import FiltersToggleButton from './filters-toggle-button';

const FilterControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-x-6">
    <FiltersToggleButton />
    <DesktopSortFilters />
    <FiltersItemsCount />
  </div>
);

export default memo(FilterControls);