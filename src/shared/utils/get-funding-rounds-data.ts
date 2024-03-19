import { FundingRound } from '~/shared/core/schemas';

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
