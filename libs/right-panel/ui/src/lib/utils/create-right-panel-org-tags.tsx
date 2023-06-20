import { type Organization } from '@jobstash/organizations/core';
import { TAG_ELEMENT_ID, TagElement } from '@jobstash/shared/core';

import {
  BankIcon,
  GlobeSimpleIcon,
  LocationIcon,
  UsersIcon,
} from '@jobstash/shared/ui';

import { createOrgFundingDateString } from './create-org-funding-date-string';

export const createRightPanelOrgTags = (organization: Organization) => {
  const { url, location, headCount, fundingRounds } = organization;
  const tags: TagElement[] = [
    {
      id: TAG_ELEMENT_ID.website,
      text: 'Website',
      icon: <GlobeSimpleIcon />,
      link: url,
    },
    {
      id: TAG_ELEMENT_ID.location,
      text: location,
      icon: <LocationIcon />,
    },
  ];

  if (headCount) {
    tags.push({
      id: TAG_ELEMENT_ID.headCount,
      text: `Employees: ${headCount}`,
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
