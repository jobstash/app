import { JobPost } from '@jobstash/jobs/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';

import { createFundingRoundsTags, UsersThreeIcon } from '@jobstash/shared/ui';

export const createJobCardOrgTags = (org: JobPost['organization']) => {
  const tags: TagElement[] = [];

  const { fundingRounds, headcountEstimate } = org;
  const sortedFundingRounds = fundingRounds.sort((a, b) => a.date - b.date);

  tags.push(...createFundingRoundsTags(sortedFundingRounds));

  if (headcountEstimate && headcountEstimate > 0) {
    tags.push({
      id: TAG_ELEMENT_ID.headcountEstimate,
      text: `Employees: ${headcountEstimate}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
