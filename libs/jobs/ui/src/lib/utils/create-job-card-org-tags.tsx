import {
  type FundingRound,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { numFormatter, shortTimestamp } from '@jobstash/shared/utils';

import { BankIcon, MoneyIcon } from '@jobstash/shared/ui';

export const createJobCardOrgTags = (fundingRounds: FundingRound[]) => {
  if (fundingRounds.length === 0) return null;

  const tags: TagElement[] = [];

  if (fundingRounds[0].raisedAmount) {
    tags.push({
      id: TAG_ELEMENT_ID.lastFunding,
      text: `Last Funding: $${numFormatter.format(
        fundingRounds[0].raisedAmount * 1_000_000,
      )}`,
      icon: <MoneyIcon />,
    });
  }

  if (fundingRounds[0].date) {
    tags.push({
      id: TAG_ELEMENT_ID.fundingRounds,
      text: `Funding Date: ${shortTimestamp(fundingRounds[0].date)}`,
      icon: <BankIcon />,
    });
  }

  return tags;
};
