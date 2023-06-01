import { memo } from 'react';

import { Button, FilterIcon } from '@jobstash/shared/ui';

interface Props {
  isActive: boolean;
  isLoading: boolean;
  filterCount: number;
  toggleFilters: () => void;
}

const FiltersToggleButton = ({
  isActive,
  isLoading,
  filterCount,
  toggleFilters,
}: Props) => (
  <Button
    variant={filterCount > 0 ? 'primary' : 'outline'}
    left={<FilterIcon />}
    isActive={isActive}
    isDisabled={isLoading}
    onClick={toggleFilters}
  >
    {`Filters & Sorting${filterCount > 0 ? ' (' + filterCount + ')' : ''}`}
  </Button>
);

export default memo(FiltersToggleButton);
