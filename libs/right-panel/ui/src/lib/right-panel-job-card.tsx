import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { Heading } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelJobCardApplyButton from './right-panel-job-card-apply-button';
import RightPanelJobCardDescriptions from './right-panel-job-card-descriptions';
import RightPanelJobCardTags from './right-panel-job-card-tags';
import RightPanelJobCardTechnologies from './right-panel-job-card-technologies';

interface Props {
  jobPost: JobPost;
}

const RightPanelJobCard = ({ jobPost }: Props) => {
  const { jobTitle, jobApplyPageUrl, technologies } = jobPost;

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-col items-start gap-y-4">
          <div className="flex h-fit w-full justify-between">
            <Heading size="md" fw="semibold">
              {jobTitle}
            </Heading>
            {/* <div className="hidden items-start space-x-4 lg:flex">
            <ShareButton jobTitle={jobTitle} />
          </div> */}
          </div>

          <RightPanelJobCardTags jobPost={jobPost} />

          <RightPanelJobCardApplyButton applyUrl={jobApplyPageUrl} />
        </div>

        <div className="flex h-8 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <RightPanelJobCardDescriptions jobPost={jobPost} />

        <RightPanelJobCardTechnologies technologies={technologies} />
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelJobCard);
