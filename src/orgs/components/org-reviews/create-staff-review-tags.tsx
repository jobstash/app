import { InfoTagProps } from '~/shared/core/types';
import { capitalize } from '~/shared/utils/capitalize';
import { LocationIcon } from '~/shared/components/icons/location-icon';
import RemoteIcon from '~/shared/components/icons/remote-icon';

import { OrgStaffReview } from '~/orgs/core/schemas';

export const createStaffReviewTags = (
  review: OrgStaffReview,
): InfoTagProps[] => {
  const { location, timezone } = review;

  const tags: InfoTagProps[] = [];

  if (location) {
    tags.push({
      text: `Location: ${capitalize(location, true)}`,
      icon: <LocationIcon />,
    });
  }

  if (timezone) {
    tags.push({
      text: `Effective Timezone: ${timezone}`,
      icon: <RemoteIcon />,
    });
  }

  return tags;
};
