/* eslint-disable camelcase */
import { ShareIcon } from '@heroicons/react/16/solid';

import {
  GA_EVENT_ACTION,
  JobInfo,
  REPORT_UI_CTX,
  type Tag,
} from '@jobstash/shared/core';
import { gaEvent, normalizeString, slugify } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { CardMenu, Heading, ReportMenuItem } from '@jobstash/shared/ui';

import { RightPanelJobCTA } from './right-panel-job-cta/right-panel-job-cta';
import { CryptoNativeJobCTA } from './crypto-native-job-cta';
import { JobShareMenuContent } from './job-share-menu-content';
import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardDescriptions from './right-panel-job-card-descriptions';
import RightPanelJobCardSets from './right-panel-job-card-sets';
import RightPanelJobCardSkills from './right-panel-job-card-skills';
import { WhiteGloveCTA } from './white-glove-cta';

interface Props {
  orgName: string;
  jobInfo: JobInfo;
  tags: Tag[];
  showExploreJob?: boolean;
  hasUser: boolean | undefined;
}

const RightPanelJobCard = ({
  orgName,
  jobInfo,
  tags,
  showExploreJob = true,
  hasUser,
}: Props) => {
  const { permissions } = useAuthContext();

  const { title, url, shortUUID, classification, access } = jobInfo;

  const onClickExploreJob = () => {
    const link = encodeURI(
      `/jobs/${slugify(
        `${orgName} ${title}`,
      )}-${shortUUID}/details?organizations=${normalizeString(orgName)}`,
    );
    if (typeof window !== 'undefined') {
      window.location.href = link;
    }
  };

  const sendAnalyticsEvent = () => {
    gaEvent(GA_EVENT_ACTION.JOB_APPLY, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: orgName,
      user_role: JSON.stringify(permissions),
    });
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
            <div className="flex items-center gap-4">
              <CardMenu icon={<ShareIcon className="w-6 h-6 text-white/80" />}>
                <JobShareMenuContent
                  shortUUID={shortUUID}
                  orgName={orgName}
                  access={access}
                />
              </CardMenu>
              <CardMenu>
                <ReportMenuItem
                  ui={REPORT_UI_CTX.JOB_DETAILS_CARD}
                  other={other}
                />
              </CardMenu>
            </div>
          </div>

          <RightPanelJobCardSets jobCardSet={jobInfo} />

          {url && access === 'public' && (
            <RightPanelJobCTA
              url={url}
              shortUUID={shortUUID}
              hasUser={hasUser}
              sendAnalyticsEvent={sendAnalyticsEvent}
            />
          )}

          {!url && access === 'protected' && (
            <div className="flex flex-col md:flex-row gap-4">
              <CryptoNativeJobCTA
                key={shortUUID}
                jobId={shortUUID}
                sendAnalyticsEvent={sendAnalyticsEvent}
              />
              <WhiteGloveCTA />
            </div>
          )}
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

export default RightPanelJobCard;
