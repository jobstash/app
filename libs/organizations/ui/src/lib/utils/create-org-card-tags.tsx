import { type OrgPost } from '@jobstash/organizations/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';

import { UsersThreeIcon } from '@jobstash/shared/ui';

export const createOrgCardTags = (orgPost: OrgPost): TagElement[] => {
  const { teamSize } = orgPost;

  const tags: TagElement[] = [];

  // TODO: jobs count
  // TODO: project count
  // TODO: last funding amount
  // TODO: last funding date

  // TODO: change teamSize to headCOunt
  if (teamSize) {
    tags.push({
      id: TAG_ELEMENT_ID.teamSize,
      text: `Employees ${teamSize}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
