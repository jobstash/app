import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { useJobBookmarks, useJobList } from '@jobstash/jobs/state';

import {
  JobBookmarkButton,
  JobCard,
  JobListEmptyResult,
} from '@jobstash/jobs/ui';
import { ListErrorMessage, Loader } from '@jobstash/shared/ui';

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

  const {
    isLoading: isLoadingBookmarks,
    bookmarkedJobs,
    isFetching: isFetchingBookmarks,
  } = useJobBookmarks();

  if (isLoading || isLoadingBookmarks) {
    return (
      <div className="pb-4">
        {initJob && (
          <JobCard
            key={initJob.id}
            isActive
            jobPost={initJob}
            filterParamsObj={filterParamsObj}
            bookmarkButton={null}
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
    <div className="flex flex-col gap-y-4 lg:gap-y-8 pb-4">
      {jobPosts.map((jobPost) => (
        <JobCard
          key={jobPost.shortUUID}
          jobPost={jobPost}
          isActive={activeJob?.shortUUID === jobPost.shortUUID}
          filterParamsObj={filterParamsObj}
          bookmarkButton={
            <JobBookmarkButton
              jobPost={jobPost}
              isBookmarked={bookmarkedJobs.has(jobPost.shortUUID)}
              isFetching={isFetchingBookmarks}
            />
          }
        />
      ))}

      {jobPosts.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}

      {(error as Error)?.message && <ListErrorMessage error={error} />}
    </div>
  );
};

export default memo(JobList);
