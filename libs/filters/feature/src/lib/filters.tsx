import { memo } from 'react';

import { type RouteSection } from '@jobstash/shared/core';

import { FiltersContext, useFilters } from '@jobstash/filters/state';

import {
  FilterActions,
  FilterControls,
  FilterInputs,
  SearchFilter,
} from '@jobstash/filters/ui';

import FiltersWrapper from './filters-wrapper';

interface Props {
  routeSection: RouteSection;
}

const Filters = ({ routeSection }: Props) => {
  const value = useFilters(routeSection);

  if (value.error) {
    return null;
  }

  return (
    <FiltersContext.Provider value={value}>
      <FiltersWrapper>
        <SearchFilter />
        <FilterControls />
        <FilterInputs />
        <FilterActions />
      </FiltersWrapper>
    </FiltersContext.Provider>
  );
};

export default memo(Filters);
