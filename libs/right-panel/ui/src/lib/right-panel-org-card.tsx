import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelOrgCardFundingRounds from './right-panel-org-card-funding-rounds';
import RightPanelOrgCardHeader from './right-panel-org-card-header';
import RightPanelOrgCardInvestors from './right-panel-org-card-investors';

interface Props {
  org: RightPanelOrg;
}

const RightPanelOrgCard = ({ org }: Props) => {
  const { name, description, fundingRounds, investors } = org;

  const sortedFundingRounds = fundingRounds.sort((a, b) => a.date - b.date);

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-6">
          <RightPanelOrgCardHeader name={name} description={description} />
          <RightPanelOrgCardFundingRounds fundingRounds={sortedFundingRounds} />
          <RightPanelOrgCardInvestors investors={investors} />
        </div>
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelOrgCard);
