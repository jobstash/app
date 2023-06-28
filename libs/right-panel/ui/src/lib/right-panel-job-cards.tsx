import { memo } from 'react';

import { type JobInfo } from '@jobstash/shared/core';

import RightPanelJobCard from './right-panel-job-card';

interface Props {
  jobInfos: JobInfo[];
}

const RightPanelJobCards = ({ jobInfos }: Props) => {
  if (jobInfos.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {jobInfos.map((jobInfo) => (
        <RightPanelJobCard
          key={jobInfo.id}
          jobInfo={jobInfo}
          technologies={[]}
        />
      ))}
    </div>
  );
};

export default memo(RightPanelJobCards);
