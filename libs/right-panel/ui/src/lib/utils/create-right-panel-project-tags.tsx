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
  MonthlyVolumeIcon,
  RevenueIcon,
  TvlIcon,
} from '@jobstash/shared/ui';

export const createRightPanelProjectTags = (project: ProjectInfo) => {
  const tags: TagElement[] = [];

  const {
    website,
    tokenSymbol,
    tvl,
    monthlyVolume,
    monthlyActiveUsers,
    monthlyFees,
    monthlyRevenue,
    category,
  } = project;

  if (category) {
    tags.push({
      id: TAG_ELEMENT_ID.category,
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (tvl) {
    tags.push({
      id: TAG_ELEMENT_ID.tvl,
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });
  }

  if (monthlyVolume) {
    tags.push({
      id: TAG_ELEMENT_ID.monthlyVolume,
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyActiveUsers) {
    tags.push({
      id: TAG_ELEMENT_ID.monthlyActiveUsers,
      text: `Monthly Active Users: $${numFormatter.format(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  if (monthlyFees)
    tags.push({
      id: TAG_ELEMENT_ID.monthlyFees,
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyRevenue)
    tags.push({
      id: TAG_ELEMENT_ID.monthlyRevenue,
      text: `Monthly Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });

  if (tokenSymbol) {
    tags.push({
      id: TAG_ELEMENT_ID.token,
      text: `Token: $${tokenSymbol}`,
      icon: <CurrencyCircleDollarIcon />,
      link: website || undefined,
    });
  }

  return tags;
};
