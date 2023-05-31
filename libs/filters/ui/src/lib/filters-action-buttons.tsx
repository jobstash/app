import { memo } from 'react';

import { Button } from '@jobstash/shared/ui';

interface Props {
  applyFilters: () => void;
  clearFilters: () => void;
}

const FiltersActionButtons = ({ applyFilters, clearFilters }: Props) => (
  <div className="flex flex-wrap gap-6 lg:py-2">
    <Button variant="primary" onClick={applyFilters}>
      Apply Filters
    </Button>
    <Button variant="outline" onClick={clearFilters}>
      Clear Filters
    </Button>
  </div>
);

export default memo(FiltersActionButtons);
