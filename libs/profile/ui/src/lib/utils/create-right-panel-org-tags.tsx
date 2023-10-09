import {
  type OrgInfo,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';

import { GlobeSimpleIcon, LocationIcon, UsersIcon } from '@jobstash/shared/ui';

export const createRightPanelOrgTags = (orgInfo: OrgInfo) => {
  const { website, location, headcountEstimate } = orgInfo;
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

  return tags;
};
