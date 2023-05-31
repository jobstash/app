import { type Organization } from '@jobstash/organizations/core';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelOrgCardFundingRounds from './right-panel-org-card-funding-rounds';
import RightPanelOrgCardHeader from './right-panel-org-card-header';
import RightPanelOrgCardInvestors from './right-panel-org-card-investors';

interface Props {
  organization: Organization;
}

export const RightPanelOrgCard = ({ organization }: Props) => {
  const { name, description, fundingRounds, investors } = organization;

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-6">
          <RightPanelOrgCardHeader name={name} description={description} />
          <RightPanelOrgCardFundingRounds fundingRounds={fundingRounds} />
          <RightPanelOrgCardInvestors investors={investors} />
        </div>
      </div>
    </RightPanelCardBorder>
  );
};
