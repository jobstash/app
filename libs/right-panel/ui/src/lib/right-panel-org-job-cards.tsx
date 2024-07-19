import { memo } from 'react';

import { type OrgJob } from '@jobstash/organizations/core';

import { useJobBookmarks } from '@jobstash/jobs/state';

import { RightPanelOrgJobBookmarkButton } from './right-panel-org-job-bookmark-button';
import RightPanelOrgJobCard from './right-panel-org-job-card';

interface Props {
  orgName: string;
  orgJobs: OrgJob[];
}

const RightPanelOrgJobCards = ({ orgName, orgJobs }: Props) => {
  const { isLoading, bookmarkedJobs, isFetching } = useJobBookmarks();

  if (orgJobs.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {orgJobs.map((orgJob) => (
        <RightPanelOrgJobCard
          key={orgJob.id}
          orgName={orgName}
          orgJob={orgJob}
          bookmarkButton={
            <RightPanelOrgJobBookmarkButton
              shortUUID={orgJob.shortUUID}
              isBookmarked={bookmarkedJobs.has(orgJob.shortUUID)}
              isLoadingFetch={isLoading || isFetching}
            />
          }
        />
      ))}
    </div>
  );
};

export default memo(RightPanelOrgJobCards);
