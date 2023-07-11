import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';
import {
  ROUTE_SECTION,
  type RouteSection,
  TAB_SEGMENT,
} from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import RightPanelOrgCardFundingRounds from './right-panel-org-card-funding-rounds';
import RightPanelOrgCardHeader from './right-panel-org-card-header';
import RightPanelOrgCardInvestors from './right-panel-org-card-investors';

interface Props {
  org: RightPanelOrg;
  routeSection: RouteSection;
}

const RightPanelOrgCard = ({ org, routeSection }: Props) => {
  const { name, description, fundingRounds, investors, orgId } = org;

  const sortedFundingRounds = fundingRounds.sort((a, b) => a.date - b.date);

  const slug = slugify(`${name} ${orgId}`);
  const link = `${ROUTE_SECTION.ORGANIZATIONS}/${slug}/${TAB_SEGMENT.details}`;

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-6">
          <RightPanelOrgCardHeader name={name} description={description} />
          <RightPanelOrgCardFundingRounds fundingRounds={sortedFundingRounds} />
          <RightPanelOrgCardInvestors investors={investors} />

          {routeSection !== ROUTE_SECTION.ORGANIZATIONS && (
            <RightPanelCta link={link} text="Explore Organization" />
          )}
        </div>
      </div>
    </RightPanelCardBorder>
  );
};

export default memo(RightPanelOrgCard);
