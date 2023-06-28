import {
  type FundingRound,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';

import { createFundingRoundsTags, UsersThreeIcon } from '@jobstash/shared/ui';

export const createJobCardOrgTags = (
  fundingRounds: FundingRound[],
  headCount?: number | null,
) => {
  const tags: TagElement[] = [];

  tags.push(...createFundingRoundsTags(fundingRounds));

  if (headCount && headCount > 0) {
    tags.push({
      id: TAG_ELEMENT_ID.headCount,
      text: `Employees: ${headCount}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
