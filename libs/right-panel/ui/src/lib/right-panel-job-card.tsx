import { ShareIcon } from '@heroicons/react/16/solid';

import { JobInfo, REPORT_UI_CTX, type Tag } from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

import { CardMenu, Heading, ReportMenuItem } from '@jobstash/shared/ui';

import { RightPanelJobCTA } from './right-panel-job-cta/right-panel-job-cta';
import { JobShareMenuContent } from './job-share-menu-content';
import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardDescriptions from './right-panel-job-card-descriptions';
import RightPanelJobCardSets from './right-panel-job-card-sets';
import RightPanelJobCardSkills from './right-panel-job-card-skills';

interface Props {
  orgName: string;
  jobInfo: JobInfo & { organization: { hasUser?: boolean } };
  tags: Tag[];
  showExploreJob?: boolean;
}

const RightPanelJobCard = ({
  orgName,
  jobInfo,
  tags,
  showExploreJob = true,
}: Props) => {
  const {
    title,
    url,
    shortUUID,
    classification,
    organization: { hasUser },
  } = jobInfo;

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
            <div className="flex items-center gap-4">
              <CardMenu icon={<ShareIcon className="w-6 h-6 text-white/80" />}>
                <JobShareMenuContent shortUUID={shortUUID} orgName={orgName} />
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

          {url && (
            <RightPanelJobCTA
              url={url}
              shortUUID={shortUUID}
              orgName={orgName}
              hasUser={hasUser}
              classification={classification}
            />
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
