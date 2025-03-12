import { Spinner } from '@heroui/spinner';
import { PrimitiveAtom, useAtomValue } from 'jotai';

import { JobPost, ROUTE_SECTION } from '@jobstash/shared/core';
import { checkJobIsFeatured } from '@jobstash/jobs/utils';

import { useJobList, useSavedJobs } from '@jobstash/jobs/state';

import {
  JobBookmarkButton,
  JobBookmarkModal,
  JobCard,
  JobCardPromoteButton,
  JobListEmptyResult,
} from '@jobstash/jobs/ui';
import { ListErrorMessage, Loader } from '@jobstash/shared/ui';

interface Props {
  initJob: JobPost | null;
  jobCountAtom: PrimitiveAtom<number | null>;
  activeJobAtom: PrimitiveAtom<JobPost | null>;
}

const JobList = ({ initJob, jobCountAtom, activeJobAtom }: Props) => {
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
  } = useJobList(initJob, jobCountAtom, activeJobAtom);

  // Prefetch saved jobs
  const { isLoading: isLoadingBookmarks, isFetching: isFetchingBookmarks } =
    useSavedJobs();

  if (isLoading) {
    return (
      <div className="pb-4">
        {initJob && (
          <JobCard
            key={initJob.id}
            isActive
            jobPost={initJob}
            filterParamsObj={filterParamsObj}
            bookmarkButton={
              <div className="flex items-center justify-center h-6 w-6">
                <Spinner size="sm" color="white" />
              </div>
            }
            promoteButton={null}
            routeSection={ROUTE_SECTION.JOBS}
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
      <JobBookmarkModal />

      {jobPosts.map((jobPost) => (
        <JobCard
          key={jobPost.shortUUID}
          jobPost={jobPost}
          isActive={activeJob?.shortUUID === jobPost.shortUUID}
          filterParamsObj={filterParamsObj}
          bookmarkButton={
            <JobBookmarkButton
              jobPost={jobPost}
              //
              // shortUUID={jobPost.shortUUID}
              // isBookmarked={bookmarkedJobs.has(jobPost.shortUUID)}
              isFetching={isFetchingBookmarks || isLoadingBookmarks}
            />
          }
          promoteButton={
            <JobCardPromoteButton
              id={jobPost.shortUUID}
              isFeatured={checkJobIsFeatured(
                jobPost.featureStartDate,
                jobPost.featureEndDate,
                jobPost.onboardIntoWeb3,
              )}
              endDate={jobPost.featureEndDate}
              filterParams={filterParamsObj}
              isProtected={jobPost.access === 'protected'}
            />
          }
          routeSection={ROUTE_SECTION.JOBS}
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

export default JobList;
