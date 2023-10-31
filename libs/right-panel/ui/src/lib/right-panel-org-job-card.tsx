import { memo } from 'react';

import { type OrgJob } from '@jobstash/organizations/core';
import { slugify } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelJobCardSets from './right-panel-job-card-sets';

interface Props {
  orgName: string;
  orgJob: OrgJob;
}

const RightPanelOrgJobCard = (props: Props) => {
  const { orgName, orgJob } = props;
  const { title, shortUUID, summary } = orgJob;

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
