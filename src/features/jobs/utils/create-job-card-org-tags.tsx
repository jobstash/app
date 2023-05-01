import { createOrgFundingDateString } from '~/features/right-panel/utils';
import { BankIcon, MoneyIcon } from '~/shared/components';
import {
  FundingRound,
  Organization,
  TagElement,
} from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createJobCardOrgTags = (fundingRounds: FundingRound[]) => {
  if (fundingRounds.length === 0) return null;

  const tags: TagElement[] = [];

  if (fundingRounds[0].raisedAmount) {
    tags.push({
      text: `Last Funding: $${numFormatter.format(
        fundingRounds[0].raisedAmount * 1_000_000,
      )}`,
      icon: <MoneyIcon />,
    });
  }

  if (fundingRounds[0].date) {
    tags.push({
      text: `Funding Date: ${createOrgFundingDateString(
        fundingRounds[0].date,
      )}`,
      icon: <BankIcon />,
    });
  }

  return tags;
};
