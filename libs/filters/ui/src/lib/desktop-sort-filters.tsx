import { memo } from 'react';

import { useFiltersContext } from '@jobstash/filters/state';

import FilterConfigMapper from './filter-config-mapper';

const DesktopSortFilters = () => {
  const { showFilters, state, sortFilterConfigs, dispatch } =
    useFiltersContext();

  if (!showFilters) return null;

  return (
    <div className="hidden grow items-center lg:flex -mx-2 lg:-mx-3">
      <FilterConfigMapper
        removeSortLabel
        filterValues={state?.filterValues}
        configs={sortFilterConfigs}
        dispatch={dispatch}
        wrapperClassName="w-1/2 sm:w-1/3 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
      />
    </div>
  );
};

export default memo(DesktopSortFilters);
