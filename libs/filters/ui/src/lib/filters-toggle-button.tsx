import { memo } from 'react';

import { Spinner } from '@nextui-org/react';

import { getToggleFilterText } from '@jobstash/filters/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button, FilterIcon } from '@jobstash/shared/ui';

const FiltersToggleButton = () => {
  const { showFilters, isLoading, filterCount, toggleFilters } =
    useFiltersContext();

  const icon = isLoading ? <Spinner size="sm" color="white" /> : <FilterIcon />;

  return (
    <Button
      variant={filterCount > 0 ? 'primary' : 'outline'}
      left={icon}
      isActive={showFilters}
      isDisabled={isLoading}
      onClick={toggleFilters}
    >
      {getToggleFilterText(filterCount)}
    </Button>
  );
};

export default memo(FiltersToggleButton);
