import { memo } from 'react';

import { useFiltersContext } from '@jobstash/filters/state';

import FilterConfigMapper from './filter-config-mapper';

const DesktopSortFilters = () => {
  const { showFilters, state, sortFilterConfigs, dispatch } =
    useFiltersContext();

  if (!showFilters) return null;

  return (
    <div className="hidden grow items-center gap-x-6 lg:flex">
      <FilterConfigMapper
        removeSortLabel
        filterValues={state?.filterValues}
        configs={sortFilterConfigs}
        dispatch={dispatch}
        wrapperClassName=""
      />
    </div>
  );
};

export default memo(DesktopSortFilters);
