import { type RightPanelOrg } from '@jobstash/right-panel/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';

import {
  BankIcon,
  GlobeSimpleIcon,
  LocationIcon,
  UsersIcon,
} from '@jobstash/shared/ui';

import { createOrgFundingDateString } from './create-org-funding-date-string';

export const createRightPanelOrgTags = (orgData: RightPanelOrg) => {
  const { website, location, headcountEstimate, fundingRounds } = orgData;
  const tags: TagElement[] = [
    {
      id: TAG_ELEMENT_ID.website,
      text: 'Website',
      icon: <GlobeSimpleIcon />,
      link: website,
    },
    {
      id: TAG_ELEMENT_ID.location,
      text: location,
      icon: <LocationIcon />,
    },
  ];

  if (headcountEstimate) {
    tags.push({
      id: TAG_ELEMENT_ID.headcountEstimate,
      text: `Employees: ${headcountEstimate}`,
      icon: <UsersIcon />,
    });
  }

  if (fundingRounds.length > 0) {
    const fundingDateTs = fundingRounds
      .filter((f) => Boolean(f.date))
      .map((f) => f.date)
      .sort((a, b) => b - a);

    if (fundingDateTs.length > 0) {
      tags.push({
        id: TAG_ELEMENT_ID.fundingDate,
        text: `Funding: ${createOrgFundingDateString(fundingDateTs[0])}`,
        icon: <BankIcon />,
      });
    }
  }

  return tags;
};
