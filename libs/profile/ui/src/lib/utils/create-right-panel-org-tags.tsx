import {
  type OrgInfo,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';

import { GlobeSimpleIcon, LocationIcon, UsersIcon } from '@jobstash/shared/ui';

export const createRightPanelOrgTags = (orgInfo: OrgInfo) => {
  const { url, location, headCount } = orgInfo;
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

  return tags;
};
