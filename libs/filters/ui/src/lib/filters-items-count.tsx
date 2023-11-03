import { memo } from 'react';

import { capitalize } from '@jobstash/shared/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Spinner, Text } from '@jobstash/shared/ui';

const FiltersItemsCount = () => {
  const { filteredItemsCount, routeSection, isLoading } = useFiltersContext();

  if (isLoading) return <Spinner />;
  if (!filteredItemsCount) return null;

  return (
    <Text
      className="my-3 inline-block whitespace-nowrap"
      color="dimmed"
    >{`${capitalize(
      routeSection.slice(1),
    )} Found: ${filteredItemsCount}`}</Text>
  );
};

export default memo(FiltersItemsCount);
