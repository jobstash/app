import { Spinner } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { EVENT_CARD_CLICK, JobPost } from '@jobstash/shared/core';
import { dispatchEvent } from '@jobstash/shared/utils';

import { activeOrgJobAtom, useOrgJobList } from '@jobstash/organizations/state';

import { JobCardNonLink } from '@jobstash/jobs/ui';
import { ListErrorMessage, Loader } from '@jobstash/shared/ui';

import { OrgJobEditButton } from './edit-button';
import { IsBlockedIndicator } from './is-blocked-indicator';
import { IsOnlineIndicator } from './is-online-indicator';

interface Props {
  orgId: string;
}

export const OrgJobList = ({ orgId }: Props) => {
  const [activeJob, setActiveJob] = useAtom(activeOrgJobAtom);

  const {
    isLoading,
    error,
    jobPosts,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  } = useOrgJobList(orgId);

  const onClickCard = (jobPost: JobPost) => {
    setActiveJob(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    // // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    // if (!isDesktop) {
    //   setIsDisabledScroll(true);
    // }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4 lg:gap-y-8">
        <div className="h-[150px] w-[calc(50%-48px)] flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (jobPosts.length === 0 && !error) {
    return (
      <p>
        This organization has no job posts at the moment. Add a job site URL to
        gather listings.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-8">
      {jobPosts.map((job) => (
        <JobCardNonLink
          key={job.id}
          jobPost={job}
          topRightAction={
            <div className="flex gap-2 items-center">
              <IsBlockedIndicator isBlocked={job.isBlocked} />
              <IsOnlineIndicator isOnline={job.isOnline} />
              <OrgJobEditButton orgJob={job} />
            </div>
          }
          isActive={activeJob?.shortUUID === job.shortUUID}
          onClick={onClickCard}
        />
      ))}

      {jobPosts.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Spinner color="white" />}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}

      {(error as Error)?.message && <ListErrorMessage error={error} />}
    </div>
  );
};
