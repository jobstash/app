import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';
import {
  ROUTE_SECTION,
  RouteSection,
  TAB_SEGMENT,
} from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

import RightPanelCardBorder from './right-panel-card-border';
import RightPanelCta from './right-panel-cta';
import { RightPanelGrantsFunding } from './right-panel-grants-funding';
import RightPanelOrgCardFundingRounds from './right-panel-org-card-funding-rounds';
import RightPanelOrgCardHeader from './right-panel-org-card-header';
import RightPanelOrgCardInvestors from './right-panel-org-card-investors';

interface RightPanelOrgCardProps {
  org: RightPanelOrg;
  showCTA?: boolean;
  routeSection: RouteSection;
}

export const RightPanelOrgCard = memo(
  ({ org, showCTA = true, routeSection }: RightPanelOrgCardProps) => {
    const { name, description, fundingRounds, investors, grants, orgId } = org;

    const sortedFundingRounds = fundingRounds.sort((a, b) => a.date - b.date);

    const slug = slugify(`${name} ${orgId}`);
    const link = `${ROUTE_SECTION.ORGANIZATIONS}/${slug}/${TAB_SEGMENT.details}`;

    const onClick = () => {
      if (typeof window !== 'undefined') {
        window.location.href = link;
      }
    };

    return (
      <RightPanelCardBorder>
        <div className="flex flex-col p-6">
          <div className="flex flex-col gap-4">
            <pre>{JSON.stringify({ grants }, undefined, '\t')}</pre>
            <RightPanelOrgCardHeader name={name} description={description} />
            <RightPanelOrgCardFundingRounds
              fundingRounds={sortedFundingRounds}
            />
            <RightPanelOrgCardInvestors
              investors={investors}
              routeSection={routeSection}
            />

            <RightPanelGrantsFunding grants={grants} />

            {showCTA && (
              <RightPanelCta text="Explore Organization" onClick={onClick} />
            )}
          </div>
        </div>
      </RightPanelCardBorder>
    );
  },
);

RightPanelOrgCard.displayName = 'RightPanelOrgCard';

interface Props {
  orgs: RightPanelOrg[];
  showCTA?: boolean;
  routeSection: RouteSection;
}

export const RightPanelOrgCards = ({ orgs, showCTA, routeSection }: Props) => (
  <div className="flex flex-col gap-4">
    {orgs.map((org) => (
      <RightPanelOrgCard
        key={org.orgId}
        org={org}
        showCTA={showCTA}
        routeSection={routeSection}
      />
    ))}
  </div>
);
