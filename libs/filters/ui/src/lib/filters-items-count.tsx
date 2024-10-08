import { memo } from 'react';

import { ROUTE_SECTION } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Text } from '@jobstash/shared/ui';

const FiltersItemsCount = () => {
  const { filteredItemsCount, routeSection, isLoading } = useFiltersContext();

  const text = (
    routeSection === ROUTE_SECTION.JOBS_FOR_EXPERTS
      ? ROUTE_SECTION.JOBS
      : routeSection
  ).slice(1);

  if (isLoading || !filteredItemsCount) return null;

  return (
    <Text
      className="inline-block whitespace-nowrap"
      color="dimmed"
    >{`Live ${capitalize(text)}: ${filteredItemsCount}`}</Text>
  );
};

export default memo(FiltersItemsCount);
