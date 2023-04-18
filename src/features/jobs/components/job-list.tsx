import { memo, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useJobListingInfQuery } from '~/features/jobs/hooks';

import { Job } from '../../jobs/core/types';

import { JobCard } from './job-card';

interface Props {
  initJob: Job;
  activeJob: Job | null;
}

const JobList = ({ initJob, activeJob }: Props) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useJobListingInfQuery();

  const jobs = useMemo(() => {
    if (!data) return [];
    const result = data.pages
      .flatMap((d) => d.data)
      .filter((d) => d.jobpost.shortUUID !== initJob.jobpost.shortUUID);
    result.unshift(initJob);

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
        <JobCard key={initJob.jobpost.shortUUID} isActive job={initJob} />
        <p>Loading JobList ...</p>
      </div>
    );

  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.jobpost.shortUUID}
          job={job}
          isActive={job.jobpost.shortUUID === activeJob?.jobpost.shortUUID}
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
