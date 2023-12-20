import { OrgStaffReview } from '@jobstash/organizations/core';
import { TAG_ELEMENT_ID, TagElement } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import {
  LocationIcon,
  RemoteIcon,
  WorkingHoursIcon,
} from '@jobstash/shared/ui';

export const createOrgStaffReviewTags = (
  staffReview: OrgStaffReview,
): TagElement[] => {
  const {
    location,
    timezone,
    workingHours: { start, end },
  } = staffReview;

  const tags: TagElement[] = [];

  if (location) {
    tags.push({
      id: TAG_ELEMENT_ID.location,
      text: `Location: ${capitalize(location.toLowerCase())}`,
      icon: <RemoteIcon />,
    });
  }

  if (timezone) {
    tags.push({
      id: TAG_ELEMENT_ID.location,
      text: `Effective Timezone: ${timezone}`,
      icon: <LocationIcon />,
    });
  }

  if (start && end) {
    tags.push({
      id: TAG_ELEMENT_ID.location,
      text: `Working Hours: ${start} - ${end}`,
      icon: <WorkingHoursIcon />,
    });
  }

  return tags;
};
