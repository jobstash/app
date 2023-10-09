import {
  type FundingRound,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';

import { createFundingRoundsTags, UsersThreeIcon } from '@jobstash/shared/ui';

export const createJobCardOrgTags = (
  fundingRounds: FundingRound[],
  headcount?: number | null,
) => {
  const tags: TagElement[] = [];

  tags.push(...createFundingRoundsTags(fundingRounds));

  if (headcount && headcount > 0) {
    tags.push({
      id: TAG_ELEMENT_ID.headcountEstimate,
      text: `Employees: ${headcount}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
