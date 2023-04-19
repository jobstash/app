import { memo, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useJobListingInfQuery } from '~/features/jobs/hooks';
import { Text } from '~/shared/components';

import type { Job } from '../../jobs/core/types';

import { JobCard } from './job-card';

interface Props {
  initJob?: Job | null;
  activeJob: Job | null;
}

const JobList = ({ initJob, activeJob }: Props) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterParams,
  } = useJobListingInfQuery();

  const jobs = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initJob) {
      result = result.filter(
        (d) => d.jobpost.shortUUID !== initJob.jobpost.shortUUID,
      );
      result.unshift(initJob);
    }

    return result;
  }, [data, initJob]);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading)
    return (
      <div>
        {initJob && (
          <JobCard
            key={initJob.jobpost.shortUUID}
            isActive
            job={initJob}
            filterParams={filterParams}
          />
        )}
        <p>Loading JobList ...</p>
      </div>
    );

  if (error) {
    return <p>error = {(error as Error).message}</p>;
  }

  return (
    <div>
      {data && (
        <div className="pt-4">
          <Text color="dimmed">{`Jobs Listed: ${data.pages[0].total}`}</Text>
        </div>
      )}
      {jobs.map((job) => (
        <JobCard
          key={job.jobpost.shortUUID}
          job={job}
          isActive={job.jobpost.shortUUID === activeJob?.jobpost.shortUUID}
          filterParams={filterParams}
        />
      ))}
      {jobs.length > 0 && (
        <div ref={ref} className="border border-violet-500 p-20">
          {isFetchingNextPage && (
            <div>
              <p className="w-full pb-8 text-center">
                Loading more job posts ...
              </p>
            </div>
          )}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}
    </div>
  );
};

export default memo(JobList);