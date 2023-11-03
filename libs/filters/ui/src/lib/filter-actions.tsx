import { memo } from 'react';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button } from '@jobstash/shared/ui';

const FilterActions = () => {
  const { showFilters, applyFilters, clearFilters } = useFiltersContext();

  if (!showFilters) return null;

  return (
    <div className="flex flex-wrap gap-6 lg:py-2">
      <Button variant="primary" onClick={() => applyFilters()}>
        Apply Filters
      </Button>
      <Button variant="outline" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default memo(FilterActions);
