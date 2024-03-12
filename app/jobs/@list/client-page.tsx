'use client';

import dynamic from 'next/dynamic';

import { ROUTE_SECTIONS } from '~/shared/core/constants';

import { jobFiltersSearchParamsAtom } from '~/jobs/atoms/job-filters-search-params-atom';
import { jobTotalCountAtom } from '~/jobs/atoms/job-total-count-atom';
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
      <FiltersSection countAtom={jobTotalCountAtom} />
      <JobList />
    </FiltersProvider>
  );
};

const FiltersSection = dynamic(() =>
  import('~/filters/components/filters-section').then((m) => m.FiltersSection),
);

const JobList = dynamic(() =>
  import('~/jobs/components/job-list').then((m) => m.JobList),
);
