import { memo } from 'react';

import { type OrgJob } from '@jobstash/organizations/core';

import RightPanelOrgJobCard from './right-panel-org-job-card';

interface Props {
  orgName: string;
  orgJobs: OrgJob[];
}

const RightPanelOrgJobCards = ({ orgName, orgJobs }: Props) => {
  console.log({ orgName, orgJobs });
  if (orgJobs.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {orgJobs.map((orgJob) => (
        <RightPanelOrgJobCard
          key={orgJob.id}
          orgName={orgName}
          orgJob={orgJob}
        />
      ))}
    </div>
  );
};

export default memo(RightPanelOrgJobCards);
