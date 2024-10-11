import { memo } from 'react';

import FiltersToggleButton from './filters-toggle-button';

const FilterControls = () => (
  <div className="flex items-center justify-between gap-x-6 gap-y-2">
    <FiltersToggleButton />
    {/* <DesktopSortFilters /> */}
  </div>
);

export default memo(FilterControls);
