import { memo } from 'react';

import { useFiltersContext } from '@jobstash/filters/state';

const FiltersItemsCount = () => {
  const { filteredItemsCount, isLoading } = useFiltersContext();

  //
  // const text = (
  //   routeSection === ROUTE_SECTION.JOBS_FOR_EXPERTS
  //     ? ROUTE_SECTION.JOBS
  //     : routeSection
  // ).slice(1);

  if (
    isLoading ||
    filteredItemsCount === null ||
    filteredItemsCount === undefined
  )
    return null;

  return <>{filteredItemsCount.toString()}</>;
};

export default memo(FiltersItemsCount);
