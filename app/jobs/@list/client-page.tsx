'use client';

import dynamic from 'next/dynamic';

import { ROUTE_SECTIONS } from '~/shared/core/constants';

import { jobFiltersSearchParamsAtom } from '~/jobs/atoms/job-filters-search-params-atom';
import { FiltersProvider } from '~/filters/providers/filters-provider';

interface Props {
  rawSearchParams: Record<string, string>;
}

export const JobListClientPage = ({ rawSearchParams }: Props) => {
  return (
    <FiltersProvider
      rawSearchParams={rawSearchParams}
      routeSection={ROUTE_SECTIONS.JOBS}
      atom={jobFiltersSearchParamsAtom}
    >
      <JobFilters />
      <JobList />
    </FiltersProvider>
  );
};

const JobFilters = dynamic(() =>
  import('~/jobs/components/job-filters').then((m) => m.JobFilters),
);

const JobList = dynamic(() =>
  import('~/jobs/components/job-list').then((m) => m.JobList),
);
