import { memo } from 'react';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}
const FilterActions = ({ isMobile }: Props) => {
  const { showFilters, applyFilters, clearFilters } = useFiltersContext();

  if (!showFilters && !isMobile) return null;

  return (
    <div className="flex flex-wrap gap-6 lg:pb-2 pt-4 sm:pt-0 justify-between sm:justify-start">
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
