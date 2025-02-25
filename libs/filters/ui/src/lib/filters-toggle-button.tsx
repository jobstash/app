import { memo } from 'react';

import { Spinner } from '@heroui/spinner';

import { getToggleFilterText } from '@jobstash/filters/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button, FilterIcon } from '@jobstash/shared/ui';
import { Text } from '@jobstash/shared/ui';

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
      className={`px-2 gap-x-0 ${filterCount > 0 ? '[&>svg]:mr-1' : ''}`}
      onClick={toggleFilters}
    >
      <span className="text-[14px]">{getToggleFilterText(filterCount)}</span>
      <Text
        className="inline-block pl-2 whitespace-nowrap lg:hidden"
        color="dimmed"
      >
        Filters and Sorting
      </Text>
    </Button>
  );
};

export default memo(FiltersToggleButton);
