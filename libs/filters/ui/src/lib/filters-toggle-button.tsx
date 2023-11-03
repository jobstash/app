import { memo } from 'react';

import { getToggleFilterText } from '@jobstash/filters/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button, FilterIcon } from '@jobstash/shared/ui';

const FiltersToggleButton = () => {
  const { showFilters, isLoading, filterCount, toggleFilters } =
    useFiltersContext();

  return (
    <Button
      variant={filterCount > 0 ? 'primary' : 'outline'}
      left={<FilterIcon />}
      isActive={showFilters}
      isDisabled={isLoading}
      onClick={toggleFilters}
    >
      {getToggleFilterText(filterCount)}
    </Button>
  );
};

export default memo(FiltersToggleButton);
