import { FilterConfigMapper } from '~/filters/components/filter-config-mapper';
import { FilterQueryInput } from '~/filters/components/filter-query-input';
import { FilterToggler } from '~/filters/components/filter-toggler';

import { JobTotalCount } from './job-total-count';

export const JobFilters = () => {
  return (
    <div className="flex flex-col gap-4">
      <FilterQueryInput placeholder="Enter job title, description, or organization..." />

      <FilterToggler countSection={<JobTotalCount />}>
        <FilterConfigMapper />
      </FilterToggler>
    </div>
  );
};
