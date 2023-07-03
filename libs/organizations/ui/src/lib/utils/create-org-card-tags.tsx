import { type OrgListItem } from '@jobstash/organizations/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';
import {
  getPluralText,
  numFormatter,
  shortTimestamp,
  slugify,
} from '@jobstash/shared/utils';

import {
  BankIcon,
  CodeIcon,
  MoneyIcon,
  SuitcaseIcon,
  UsersThreeIcon,
} from '@jobstash/shared/ui';

export const createOrgCardTags = (orgListItem: OrgListItem): TagElement[] => {
  const {
    name,
    orgId,
    headCount,
    jobCount,
    projectCount,
    lastFundingAmount,
    lastFundingDate,
  } = orgListItem;

  const tags: TagElement[] = [];

  const slug = slugify(`${name} ${orgId}`);
  const baseRoute = `/organizations/${slug}`;

  if (jobCount > 0) {
    tags.push({
      id: TAG_ELEMENT_ID.jobs,
      text: `${getPluralText('Job', jobCount)}: ${jobCount}`,
      icon: <SuitcaseIcon />,
      link: `${baseRoute}/jobs`,
    });
  }

  if (projectCount > 0) {
    tags.push({
      id: TAG_ELEMENT_ID.projects,
      text: `${getPluralText('Project', projectCount)}: ${projectCount}`,
      icon: <CodeIcon />,
      link: `${baseRoute}/projects`,
    });
  }

  if (headCount) {
    tags.push({
      id: TAG_ELEMENT_ID.headCount,
      text: `Employees ${headCount}`,
      icon: <UsersThreeIcon />,
    });
  }

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