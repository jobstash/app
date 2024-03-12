'use client';

import { cn } from '~/shared/utils/cn';
import { reloadPage } from '~/shared/utils/reload-page';
import { InternalErrorResult } from '~/shared/components/internal-error-result';

import { useJobList } from '~/jobs/hooks/use-job-list';
import { InitJobCard } from '~/jobs/components/init-job-card';
import { JobCard } from '~/jobs/components/job-card';
import { JobCardSkeleton } from '~/jobs/components/job-card/skeleton';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

import { JobListVirtualWrapper } from './virtual-wrapper';

export const JobList = () => {
  const {
    jobs,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingJobs,
  } = useJobList();
  const hasJobs = jobs.length > 0;

  const { isPendingFilters, filterSearchParams } = useFiltersContext();

  const isPending = [isPendingFilters, isPendingJobs].includes(true);

  const filterParamsString =
    filterSearchParams.size > 0 ? `?${filterSearchParams.toString()}` : '';

  return (
    <>
      {error && <InternalErrorResult onReset={reloadPage} />}

      {isPending ? (
        <JobCardSkeleton />
      ) : (
        isSuccess &&
        (hasJobs ? (
          <>
            <InitJobCard filterParamsString={filterParamsString} />

            <JobListVirtualWrapper count={jobs.length}>
              {(index) => (
                <div className={cn({ 'pt-8': index > 0 })}>
                  <JobCard
                    job={jobs[index]}
                    filterParamsString={filterParamsString}
                  />
                </div>
              )}
            </JobListVirtualWrapper>

            {hasNextPage ? (
              <div ref={inViewRef}>
                <JobCardSkeleton />
              </div>
            ) : (
              <p>TODO: No more jobs UI</p>
            )}
          </>
        ) : (
          <p>TODO: Empty UI</p>
        ))
      )}
    </>
  );
};
