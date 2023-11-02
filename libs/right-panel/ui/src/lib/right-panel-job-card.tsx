/* eslint-disable camelcase */
import { memo } from 'react';

import { GA_EVENT_ACTION, type JobInfo, type Tag } from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';
import { gaEvent } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardDescriptions from './right-panel-job-card-descriptions';
import RightPanelJobCardSets from './right-panel-job-card-sets';
import RightPanelJobCardSkills from './right-panel-job-card-skills';

interface Props {
  orgName: string;
  jobInfo: JobInfo;
  tags: Tag[];
  showExploreJob?: boolean;
}

const RightPanelJobCard = ({
  orgName,
  jobInfo,
  tags,
  showExploreJob = true,
}: Props) => {
  const { title, url, shortUUID, classification } = jobInfo;

  const onClickApplyJob = () => {
    gaEvent(GA_EVENT_ACTION.JOB_APPLY, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: orgName,
    });

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const onClickExploreJob = () => {
    const link = `/jobs/${slugify(`${orgName} ${title}`)}-${shortUUID}/details`;
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
              {title}
            </Heading>
            {/* <div className="hidden items-start space-x-4 lg:flex">
            <ShareButton title={title} />
          </div> */}
          </div>

          <RightPanelJobCardSets jobCardSet={jobInfo} />

          <RightPanelCta text="Apply for this job" onClick={onClickApplyJob} />
        </div>

        <div className="flex h-4 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <RightPanelJobCardDescriptions jobInfo={jobInfo} />

        <RightPanelJobCardSkills tags={tags} />

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
