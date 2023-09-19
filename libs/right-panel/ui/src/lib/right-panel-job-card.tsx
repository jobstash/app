/* eslint-disable camelcase */
import { memo } from 'react';

import {
  GA_EVENT_ACTION,
  type JobInfo,
  type Technology,
} from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';
import { gaEvent } from '@jobstash/shared/utils';

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
  showExploreJob?: boolean;
}

const RightPanelJobCard = ({
  orgName,
  jobInfo,
  technologies,
  showExploreJob = true,
}: Props) => {
  const { jobTitle, jobApplyPageUrl, shortUUID } = jobInfo;

  const onClickApplyJob = () => {
    gaEvent(GA_EVENT_ACTION.JOB_APPLY, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      organization_name: orgName,
    });

    if (typeof window !== 'undefined') {
      window.open(jobApplyPageUrl, '_blank');
    }
  };

  const onClickExploreJob = () => {
    const link = `/jobs/${slugify(
      `${orgName} ${jobTitle}`,
    )}-${shortUUID}/details`;
    if (typeof window !== 'undefined') {
      window.location.href = link;
    }
  };

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

          <RightPanelCta text="Apply for this job" onClick={onClickApplyJob} />
        </div>

        <div className="flex h-8 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <RightPanelJobCardDescriptions jobInfo={jobInfo} />

        <RightPanelJobCardTechnologies technologies={technologies} />

        {showExploreJob && (
          <div className="flex flex-col items-start py-4">
            <RightPanelCta text="Explore Job" onClick={onClickExploreJob} />
          </div>
        )}
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelJobCard);
