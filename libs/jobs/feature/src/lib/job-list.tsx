import { memo } from 'react';

import { PrimitiveAtom, useAtomValue } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import { ROUTE_SECTION } from '@jobstash/shared/core';

import { useJobBookmarks, useJobList } from '@jobstash/jobs/state';

import {
  JobBookmarkButton,
  JobCard,
  JobListEmptyResult,
} from '@jobstash/jobs/ui';
import { ListErrorMessage, Loader } from '@jobstash/shared/ui';

interface Props {
  initJob: JobPost | null;
  jobCountAtom: PrimitiveAtom<number | null>;
  activeJobAtom: PrimitiveAtom<JobPost | null>;
  access?: JobPost['access'];
}

const JobList = ({
  initJob,
  jobCountAtom,
  activeJobAtom,
  access = 'public',
}: Props) => {
  const activeJob = useAtomValue(activeJobAtom);
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
  } = useJobList(initJob, jobCountAtom, activeJobAtom, access);

  const {
    isLoading: isLoadingBookmarks,
    bookmarkedJobs,
    isFetching: isFetchingBookmarks,
  } = useJobBookmarks();

  const routeSection =
    access === 'public' ? ROUTE_SECTION.JOBS : ROUTE_SECTION.JOBS_FOR_EXPERTS;

  if (isLoading) {
    return (
      <div className="pb-4">
        {initJob && (
          <JobCard
            key={initJob.id}
            isActive
            jobPost={initJob}
            filterParamsObj={filterParamsObj}
            bookmarkButton={null}
            routeSection={routeSection}
            activeJobAtom={activeJobAtom}
          />
        )}
        <div className="flex items-center justify-center w-full h-full pt-12">
          <Loader />
        </div>
      </div>
    );
  }

  if (jobPosts.length === 0 && !error) {
    return <JobListEmptyResult prevLink={jobsPrevLink} push={push} />;
  }

  return (
    <div className="flex flex-col pb-4 gap-y-4 lg:gap-y-8">
      {jobPosts.map((jobPost) => (
        <JobCard
          key={jobPost.shortUUID}
          jobPost={jobPost}
          isActive={activeJob?.shortUUID === jobPost.shortUUID}
          filterParamsObj={filterParamsObj}
          bookmarkButton={
            <JobBookmarkButton
              shortUUID={jobPost.shortUUID}
              isBookmarked={bookmarkedJobs.has(jobPost.shortUUID)}
              isFetching={isFetchingBookmarks || isLoadingBookmarks}
            />
          }
          routeSection={routeSection}
          activeJobAtom={activeJobAtom}
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
