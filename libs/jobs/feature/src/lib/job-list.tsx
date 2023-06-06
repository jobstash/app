import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { useJobList } from '@jobstash/jobs/state';

import { JobCard, JobListEmptyResult } from '@jobstash/jobs/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  initJob: JobPost | null;
  activeJob: JobPost | null;
}

const JobList = ({ initJob, activeJob }: Props) => {
  const {
    push,
    isLoading,
    error,
    jobPosts,
    jobsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  } = useJobList(initJob);

  if (isLoading) {
    return (
      <div className="py-4">
        {initJob && (
          <JobCard
            key={initJob.id}
            isActive
            jobPost={initJob}
            filterParamsObj={filterParamsObj}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (jobPosts.length === 0 && !error) {
    return (
      <div className="py-8">
        <JobListEmptyResult prevLink={jobsPrevLink} push={push} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {jobPosts.map((jobPost) => (
        <JobCard
          key={jobPost.shortUUID}
          jobPost={jobPost}
          isActive={activeJob?.shortUUID === jobPost.shortUUID}
          filterParamsObj={filterParamsObj}
        />
      ))}

      {jobPosts.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}
      {(error as Error)?.message && (
        <div className="py-8">
          <p>error = {(error as Error).message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(JobList);
