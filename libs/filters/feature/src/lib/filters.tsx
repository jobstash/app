import { memo } from 'react';

import { type RouteSection } from '@jobstash/shared/core';

import { FiltersContext, useFilters } from '@jobstash/filters/state';

import {
  FilterContents,
  FilterControls,
  FullscreenrenFilterModal,
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
        {/* <FilterControls /> */}
        <FilterContents />
      </FiltersWrapper>
      <FullscreenrenFilterModal />
    </FiltersContext.Provider>
  );
};

export default memo(Filters);
