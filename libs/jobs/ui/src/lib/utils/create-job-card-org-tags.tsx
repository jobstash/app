import {
  type FundingRound,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { numFormatter, shortTimestamp } from '@jobstash/shared/utils';

import { BankIcon, MoneyIcon, UsersThreeIcon } from '@jobstash/shared/ui';

export const createJobCardOrgTags = (
  fundingRounds: FundingRound[],
  headCount: number | null,
) => {
  const tags: TagElement[] = [];

  if (fundingRounds.length > 0) {
    let lastFunding: number | null = null;
    let fundingDate: number | null = null;
    for (const fundingRound of fundingRounds.reverse()) {
      if (fundingRound.raisedAmount !== null) {
        lastFunding = fundingRound.raisedAmount;
        fundingDate = fundingRound.date;
      }
    }

    if (lastFunding) {
      tags.push({
        id: TAG_ELEMENT_ID.lastFunding,
        text: `Last Funding: $${numFormatter.format(lastFunding * 1_000_000)}`,
        icon: <MoneyIcon />,
      });
    }

    if (fundingDate) {
      tags.push({
        id: TAG_ELEMENT_ID.fundingRounds,
        text: `Funding Date: ${shortTimestamp(fundingDate)}`,
        icon: <BankIcon />,
      });
    }
  }

  if (headCount && headCount > 0) {
    tags.push({
      id: TAG_ELEMENT_ID.headCount,
      text: `Employees: ${headCount}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
