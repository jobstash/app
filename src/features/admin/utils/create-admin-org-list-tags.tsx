import { createOrgFundingDateString } from '~/features/right-panel/utils';
import {
  BankIcon,
  CodeIcon,
  MoneyIcon,
  SuitcaseIcon,
  UsersThreeIcon,
} from '~/shared/components';
import type { TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

import type { ShortOrg } from '../core/types';

export const createAdminOrgListTags = ({
  jobCount,
  projectCount,
  headCount,
  lastFundingAmount,
  lastFundingDate,
  technologies,
}: ShortOrg): TagElement[] => {
  const tags: TagElement[] = [];

  if (jobCount > 0) {
    tags.push({ text: `Jobs: ${jobCount}`, icon: <SuitcaseIcon /> });
  }

  if (projectCount > 0) {
    tags.push({ text: `Projects: ${projectCount}`, icon: <CodeIcon /> });
  }

  if (headCount > 0) {
    tags.push({ text: `Employees: ${headCount}`, icon: <UsersThreeIcon /> });
  }

  if (lastFundingAmount > 0) {
    tags.push({
      text: `Last Funding: $${numFormatter.format(
        lastFundingAmount * 1_000_000,
      )}`,
      icon: <MoneyIcon />,
    });
  }

  if (lastFundingDate !== 0) {
    tags.push({
      text: `Funding Date: ${createOrgFundingDateString(lastFundingDate)}`,
      icon: <BankIcon />,
    });
  }

  return tags;
};
