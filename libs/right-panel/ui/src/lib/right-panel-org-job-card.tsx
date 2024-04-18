import React, { memo } from 'react';

import { type OrgJob } from '@jobstash/organizations/core';
import { REPORT_UI_CTX } from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

import { CardMenu, Heading, ReportMenuItem, Text } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardSets from './right-panel-job-card-sets';

interface Props {
  orgName: string;
  orgJob: OrgJob;
  bookmarkButton: React.ReactNode;
}

const RightPanelOrgJobCard = (props: Props) => {
  const { orgName, orgJob, bookmarkButton } = props;
  const { title, shortUUID, summary } = orgJob;

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
              <div className="flex items-center justify-center w-9 h-9">
                {bookmarkButton}
              </div>
              <CardMenu>
                <ReportMenuItem
                  ui={REPORT_UI_CTX.OTHER_JOBS_CARD}
                  other={other}
                />
              </CardMenu>
            </div>
          </div>

          <RightPanelJobCardSets jobCardSet={orgJob} />
        </div>

        <div className="flex h-2 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        {summary && (
          <div className="flex flex-col gap-2 self-stretch">
            <Heading size="sm" fw="semibold">
              Summary
            </Heading>
            <Text color="dimmed">{summary}</Text>
          </div>
        )}

        <div className="flex flex-col items-start">
          <RightPanelCta text="Explore Job" onClick={onClickExploreJob} />
        </div>
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelOrgJobCard);
