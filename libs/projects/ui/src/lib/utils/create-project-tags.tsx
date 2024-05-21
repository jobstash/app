/* eslint-disable complexity */
import {
  type ProjectInfo,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { getPluralText, numFormatter } from '@jobstash/shared/utils';

import {
  ActiveUsersIcon,
  CategoryIcon,
  CurrencyCircleDollarIcon,
  MainnetIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  ShieldCheckIcon,
  SkullIcon,
  TvlIcon,
} from '@jobstash/shared/ui';

export const createProjectTags = (project: ProjectInfo) => {
  const upperTags: TagElement[] = [];
  const midTags: TagElement[] = [];

  const {
    website,
    tokenSymbol,
    tvl,
    monthlyVolume,
    monthlyActiveUsers,
    monthlyFees,
    monthlyRevenue,
    category,
    isMainnet,
    audits,
    hacks,
  } = project;

  if (category) {
    upperTags.push({
      id: TAG_ELEMENT_ID.category,
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (tvl) {
    upperTags.push({
      id: TAG_ELEMENT_ID.tvl,
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });
  }

  if (monthlyVolume) {
    upperTags.push({
      id: TAG_ELEMENT_ID.monthlyVolume,
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyActiveUsers) {
    upperTags.push({
      id: TAG_ELEMENT_ID.monthlyActiveUsers,
      text: `Monthly Active Users: $${numFormatter.format(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  if (monthlyFees)
    upperTags.push({
      id: TAG_ELEMENT_ID.monthlyFees,
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyRevenue)
    upperTags.push({
      id: TAG_ELEMENT_ID.monthlyRevenue,
      text: `Monthly Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });

  if (tokenSymbol) {
    upperTags.push({
      id: TAG_ELEMENT_ID.token,
      text: `Token: $${tokenSymbol}`,
      icon: <CurrencyCircleDollarIcon />,
      link: website || undefined,
    });
  }

  if (isMainnet) {
    upperTags.push({
      id: TAG_ELEMENT_ID.mainnet,
      text: 'Mainnet',
      icon: <MainnetIcon />,
    });
  }

  if (audits.length > 0) {
    for (const audit of audits) {
      const issueCount = audit.techIssues ?? 0;
      const title = audit.name;
      midTags.push({
        id: `${TAG_ELEMENT_ID.audit} ${audit.id}`,
        text: `${getPluralText('Audit', issueCount)}: ${title}${
          issueCount
            ? ' (' + issueCount + ` ${getPluralText('issue', issueCount)})`
            : ''
        }`,
        icon: <ShieldCheckIcon />,
        link: audit.link ?? undefined,
      });
    }
  }

  if (hacks.length > 0) {
    for (const hack of hacks) {
      const title =
        hack.category && hack.category !== 'Other' ? hack.category : '';
      const issueType = hack.issueType ?? 'Other';
      const fundsLost = hack.fundsLost
        ? `($${numFormatter.format(hack.fundsLost)})`
        : '';
      midTags.push({
        id: `${TAG_ELEMENT_ID.hack} ${hack.id}`,
        text: `Hack: ${title} ${issueType} ${fundsLost}`,
        icon: <SkullIcon />,
      });
    }
  }

  return { upperTags, midTags };
};
