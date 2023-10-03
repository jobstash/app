import {
  type ProjectInfo,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { numFormatter } from '@jobstash/shared/utils';

import {
  ActiveUsersIcon,
  CategoryIcon,
  CurrencyCircleDollarIcon,
  MainnetIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  TvlIcon,
} from '@jobstash/shared/ui';
export const createJobCardProjectTags = (project: ProjectInfo) => {
  const projectInfoTags: TagElement[] = [];
  const projectTvlTags: TagElement[] = [];
  const projectAuditTags: TagElement[] = [];

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
  } = project;

  if (tokenSymbol)
    projectInfoTags.push({
      id: TAG_ELEMENT_ID.token,
      text: `Token: $${tokenSymbol}`,
      icon: <CurrencyCircleDollarIcon />,
      link: website,
    });

  if (category) {
    projectInfoTags.push({
      id: TAG_ELEMENT_ID.category,
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (isMainnet)
    projectInfoTags.push({
      id: TAG_ELEMENT_ID.mainnet,
      text: 'Mainnet',
      icon: <MainnetIcon />,
    });

  if (tvl)
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.tvl,
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });

  if (monthlyVolume)
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyVolume,
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyActiveUsers) {
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyActiveUsers,
      text: `Monthly Active Users: $${numFormatter.format(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  if (monthlyFees)
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyFees,
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyRevenue)
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyRevenue,
      text: `Monthly Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });

  return { projectInfoTags, projectTvlTags, projectAuditTags };
};
