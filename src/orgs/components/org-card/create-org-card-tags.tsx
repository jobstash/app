import { InfoTagProps } from '~/shared/core/types';
import { formatNumber } from '~/shared/utils/format-number';
import { getPluralText } from '~/shared/utils/get-plural-text';
import { shortTimestamp } from '~/shared/utils/short-timestamp';
import { BankIcon } from '~/shared/components/icons/bank-icon';
import { CodeIcon } from '~/shared/components/icons/code-icon';
import { PaperBillIcon } from '~/shared/components/icons/paper-bill-icon';
import { SuitCaseIcon } from '~/shared/components/icons/suit-case-icon';
import { UsersThreeIcon } from '~/shared/components/icons/users-three-icon';

import { OrgListItem } from '~/orgs/core/schemas';

export const createOrgCardTags = (orgListItem: OrgListItem): InfoTagProps[] => {
  const {
    orgId,
    headcountEstimate,
    jobCount,
    projectCount,
    lastFundingAmount,
    lastFundingDate,
  } = orgListItem;

  const tags: InfoTagProps[] = [];

  const baseRoute = `/organizations/${orgId}`;

  if (jobCount > 0) {
    tags.push({
      text: `${getPluralText('Job', jobCount)}: ${jobCount}`,
      icon: <SuitCaseIcon />,
      link: `${baseRoute}/jobs`,
      showExternalIcon: false,
    });
  }

  if (projectCount > 0) {
    tags.push({
      text: `${getPluralText('Project', projectCount)}: ${projectCount}`,
      icon: <CodeIcon />,
      link: `${baseRoute}/projects`,
      showExternalIcon: false,
    });
  }

  if (headcountEstimate) {
    tags.push({
      text: `Employees ${headcountEstimate}`,
      icon: <UsersThreeIcon />,
    });
  }

  if (lastFundingAmount) {
    tags.push({
      text: `Last Funding: $${formatNumber(lastFundingAmount * 1_000_000)}`,
      icon: <PaperBillIcon />,
    });
  }

  if (lastFundingDate) {
    tags.push({
      text: `Funding Date: ${shortTimestamp(lastFundingDate)}`,
      icon: <BankIcon />,
    });
  }

  return tags;
};
