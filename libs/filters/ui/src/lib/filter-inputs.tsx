import { memo } from 'react';

import { useFiltersContext } from '@jobstash/filters/state';

import FilterConfigMapper from './filter-config-mapper';

const FilterInputs = () => {
  const { showFilters, state, shownFilterConfigs, dispatch } =
    useFiltersContext();

  if (!showFilters) return null;

  return (
    <div className="-mx-2 flex flex-wrap pb-4 lg:-mx-3 lg:-mb-4">
      <FilterConfigMapper
        filterValues={state?.filterValues}
        configs={shownFilterConfigs}
        dispatch={dispatch}
        wrapperClassName="w-1/3 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
      />
    </div>
  );
};

export default memo(FilterInputs);
