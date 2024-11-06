import { Spinner } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { EVENT_CARD_CLICK, JobPost } from '@jobstash/shared/core';
import { dispatchEvent } from '@jobstash/shared/utils';

import { activeOrgJobAtom, useOrgJobList } from '@jobstash/organizations/state';

import { JobCardNonLink } from '@jobstash/jobs/ui';
import { ListErrorMessage } from '@jobstash/shared/ui';

import { OrgJobEditButton } from './edit-button';

interface Props {
  slug: string;
}

export const OrgJobList = ({ slug }: Props) => {
  const [activeJob, setActiveJob] = useAtom(activeOrgJobAtom);

  const {
    isLoading,
    error,
    jobPosts,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  } = useOrgJobList(slug);

  const onClickCard = (jobPost: JobPost) => {
    setActiveJob(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    // // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    // if (!isDesktop) {
    //   setIsDisabledScroll(true);
    // }
  };

  if (isLoading) return <p>Loading ...</p>;

  if (jobPosts.length === 0 && !error) {
    return (
      <p>
        TODO: Empty message. Should encourage to fillup jobsite to be crawled
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-8">
      {jobPosts.map((job) => (
        <JobCardNonLink
          key={job.id}
          jobPost={job}
          topRightAction={<OrgJobEditButton />}
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
