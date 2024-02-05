import { ProfileOrgReview } from '@jobstash/profile/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';
import { getWebsiteText } from '@jobstash/shared/utils';

import { GlobeSimpleIcon, LocationIcon, UsersIcon } from '@jobstash/shared/ui';

export const createRightPanelOrgTags = (orgInfo: ProfileOrgReview['org']) => {
  const { website, location, headCount } = orgInfo;
  const tags: TagElement[] = [];

  if (website) {
    const { link } = getWebsiteText(website);
    tags.push({
      id: TAG_ELEMENT_ID.website,
      text: 'Website',
      icon: <GlobeSimpleIcon />,
      link,
    });
  }

  if (location) {
    tags.push({
      id: TAG_ELEMENT_ID.location,
      text: location,
      icon: <LocationIcon />,
    });
  }

  if (headCount) {
    tags.push({
      id: TAG_ELEMENT_ID.headcountEstimate,
      text: `Employees: ${headCount}`,
      icon: <UsersIcon />,
    });
  }

  return tags;
};
