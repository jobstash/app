import {
  type FundingRound,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { numFormatter, shortTimestamp } from '@jobstash/shared/utils';

import { BankIcon, MoneyIcon } from '../..';

export const getFundingRoundsData = (fundingRounds: FundingRound[]) => {
  let lastFundingAmount = 0;
  let lastFundingDate = 0;

  if (fundingRounds.length > 0) {
    for (const fundingRound of fundingRounds) {
      if (fundingRound.date && fundingRound.date > (lastFundingDate ?? 0)) {
        lastFundingDate = fundingRound.date;
        lastFundingAmount = fundingRound.raisedAmount ?? 0;
      }
    }
  }

  return { lastFundingAmount, lastFundingDate };
};

export const createFundingRoundsTags = (fundingRounds: FundingRound[]) => {
  const tags: TagElement[] = [];

  const { lastFundingAmount, lastFundingDate } =
    getFundingRoundsData(fundingRounds);

  if (lastFundingAmount) {
    tags.push({
      id: TAG_ELEMENT_ID.lastFunding,
      text: `Last Funding: $${numFormatter.format(
        lastFundingAmount * 1_000_000,
      )}`,
      icon: <MoneyIcon />,
    });
  }

  if (lastFundingDate) {
    tags.push({
      id: TAG_ELEMENT_ID.fundingRounds,
      text: `Funding Date: ${shortTimestamp(lastFundingDate)}`,
      icon: <BankIcon />,
    });
  }

  return tags;
};
