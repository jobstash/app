import { memo } from 'react';

import { useFilters } from '@jobstash/filters/state';

import {
  FilterConfigMapper,
  FiltersJobCount,
  FiltersToggleButton,
  SearchFilter,
} from '@jobstash/filters/ui';
import { Button } from '@jobstash/shared/ui';

interface Props {
  jobCount?: number;
}

const Filters = ({ jobCount }: Props) => {
  const {
    state,
    dispatch,
    isLoading,
    onSubmitSearch,
    onChangeSearch,
    clearSearch,
    filterCount,
    toggleFilters,
    sortFilterConfigs,
    shownFilterConfigs,
    applyFilters,
    clearFilters,
  } = useFilters();

  return (
    <div className="flex flex-col pt-4 lg:pt-8">
      <div className="flex flex-col gap-y-3">
        <SearchFilter
          isLoading={isLoading}
          clearSearch={clearSearch}
          searchQuery={state?.filterValues?.query}
          onSubmit={onSubmitSearch}
          onChange={onChangeSearch}
        />

        {/* DESKTOP FILTER TOP */}
        <div className="flex flex-wrap items-center justify-between gap-x-6">
          <FiltersToggleButton
            isActive={Boolean(state?.showFilters)}
            isLoading={isLoading}
            filterCount={filterCount}
            toggleFilters={toggleFilters}
          />

          {state?.showFilters && (
            <div className="hidden grow items-center gap-x-6 lg:flex">
              <FilterConfigMapper
                filterValues={state?.filterValues}
                configs={sortFilterConfigs}
                dispatch={dispatch}
                wrapperClassName="w-[150px]"
              />
            </div>
          )}

          <FiltersJobCount jobCount={jobCount} />
        </div>

        {/* DESKTOP FILTER CONTENTS */}
        {state?.showFilters && (
          <div className="-mx-2 flex flex-wrap pb-4 lg:-mx-3 lg:-mb-4">
            <FilterConfigMapper
              filterValues={state?.filterValues}
              configs={shownFilterConfigs}
              dispatch={dispatch}
              wrapperClassName="w-1/3 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
            />
          </div>
        )}

        {/* FILTER CONTROLS */}
        <div className="flex flex-wrap gap-6 lg:py-2">
          <Button variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Filters);