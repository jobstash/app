/* eslint-disable camelcase */
import { memo } from 'react';

import { useModal } from 'connectkit';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { JobPost } from '@jobstash/jobs/core';
import {
  GA_EVENT_ACTION,
  REPORT_UI_CTX,
  type Tag,
} from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';
import { gaEvent } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import { useSendJobApplyInteractionMutation } from '@jobstash/jobs/state';

import { CardMenu, Heading, ReportMenuItem } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardDescriptions from './right-panel-job-card-descriptions';
import RightPanelJobCardSets from './right-panel-job-card-sets';
import RightPanelJobCardSkills from './right-panel-job-card-skills';

interface Props {
  orgName: string;
  jobPost: JobPost;
  tags: Tag[];
  showExploreJob?: boolean;
}

const RightPanelJobCard = ({
  orgName,
  jobPost,
  tags,
  showExploreJob = true,
}: Props) => {
  const {
    title,
    url,
    shortUUID,
    classification,
    organization: { hasUser },
  } = jobPost;

  const { role } = useAuthContext();
  const isDev = role === CHECK_WALLET_ROLES.DEV;

  const { mutate: sendJobApplyInteraction } =
    useSendJobApplyInteractionMutation();

  const { setOpen } = useModal();

  const openApplyPage = () => {
    if (!isDev && hasUser) {
      setOpen(true);
      return;
    }

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const sendAnalyticsEvent = () => {
    gaEvent(GA_EVENT_ACTION.JOB_APPLY, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: orgName,
    });
  };

  const onClickApplyJob = () => {
    sendAnalyticsEvent();

    if (isDev) {
      sendJobApplyInteraction(shortUUID);
    }

    openApplyPage();
  };

  const onClickExploreJob = () => {
    const link = `/jobs/${slugify(`${orgName} ${title}`)}-${shortUUID}/details`;
    if (typeof window !== 'undefined') {
      window.location.href = link;
    }
  };

  const other = JSON.stringify({ job: { title, shortUUID } });

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-col items-start gap-y-4">
          <div className="flex h-fit w-full items-center justify-between gap-2 relative">
            <Heading size="md" fw="semibold">
              {title}
            </Heading>
            <CardMenu>
              <ReportMenuItem
                ui={REPORT_UI_CTX.JOB_DETAILS_CARD}
                other={other}
              />
            </CardMenu>
          </div>

          <RightPanelJobCardSets jobCardSet={jobPost} />

          <RightPanelCta text="Apply for this job" onClick={onClickApplyJob} />
        </div>

        <div className="flex h-4 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <RightPanelJobCardDescriptions jobInfo={jobPost} />

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
