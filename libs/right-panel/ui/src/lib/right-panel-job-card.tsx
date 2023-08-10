import { memo } from 'react';

import { type JobInfo, type Technology } from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardDescriptions from './right-panel-job-card-descriptions';
import RightPanelJobCardTags from './right-panel-job-card-tags';
import RightPanelJobCardTechnologies from './right-panel-job-card-technologies';

interface Props {
  orgName: string;
  jobInfo: JobInfo;
  technologies: Technology[];
}

const RightPanelJobCard = ({ orgName, jobInfo, technologies }: Props) => {
  const { jobTitle, jobApplyPageUrl, shortUUID } = jobInfo;

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

          <RightPanelJobCardTags jobInfo={jobInfo} />

          <RightPanelCta
            external
            link={jobApplyPageUrl}
            text="Apply for this job"
          />
        </div>

        <div className="flex h-8 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <RightPanelJobCardDescriptions jobInfo={jobInfo} />

        <RightPanelJobCardTechnologies technologies={technologies} />

        <div className="flex flex-col items-start py-4">
          <RightPanelCta
            external
            link={`/jobs/${slugify(
              `${orgName} ${jobTitle}`,
            )}-${shortUUID}/details`}
            text="Explore Job"
          />
        </div>
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelJobCard);
