import { FundingRound } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { formatNumber } from '~/shared/utils/format-number';
import { shortTimestamp } from '~/shared/utils/short-timestamp';
import { BankIcon } from '~/shared/components/icons/bank-icon';
import { PaperBillIcon } from '~/shared/components/icons/paper-bill-icon';
import { UsersThreeIcon } from '~/shared/components/icons/users-three-icon';

import { JobOrg } from '~/jobs/core/schemas';

export const createJobCardOrgInfoTags = (org: JobOrg) => {
  const { fundingRounds, headcountEstimate } = org;
  const { fundingAmount, fundingDate } = getMostRecentFunding(fundingRounds);

  const tags: InfoTagProps[] = [];

  if (fundingAmount) {
    tags.push({
      text: `Last Funding: $${formatNumber(fundingAmount * 1_000_000)}`,
      icon: <PaperBillIcon />,
    });
  }

  if (fundingDate) {
    tags.push({
      text: `Funding Date: ${shortTimestamp(fundingDate)}`,
      icon: <BankIcon />,
    });
  }

  if (headcountEstimate) {
    tags.push({
      text: `Employees: ${headcountEstimate}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};

export const getMostRecentFunding = (fundingRounds: FundingRound[]) => {
  let fundingDate = 0;
  let fundingAmount: null | number = 0;

  if (fundingRounds.length > 0) {
    for (const round of fundingRounds) {
      if (round.date > fundingDate) {
        fundingDate = round.date;
        fundingAmount = round.raisedAmount;
      }
    }
  }

  return { fundingDate, fundingAmount };
};
