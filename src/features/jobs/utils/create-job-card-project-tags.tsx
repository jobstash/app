import {
  CategoryIcon,
  CurrencyCircleDollarIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  ShieldCheckIcon,
  SkullIcon,
  TvlIcon,
} from '~/shared/components';
import { Project, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createJobCardProjectTags = (project?: Project) => {
  if (!project) return [];

  const {
    url,
    tokenSymbol,
    tvl,
    monthlyVolume,
    monthlyFees,
    monthlyRevenue,
    hacks,
    audits,
  } = project;

  const tags: TagElement[] = [];

  if (tokenSymbol)
    tags.push({
      text: `Token: $${tokenSymbol}`,
      icon: <CurrencyCircleDollarIcon />,
      link: url,
    });

  tags.push({
    text: 'Category: TBD',
    icon: <CategoryIcon />,
  });

  if (tvl)
    tags.push({
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });

  if (monthlyVolume)
    tags.push({
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyFees)
    tags.push({
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyRevenue)
    tags.push({
      text: `Monthly Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });

  if (audits.length > 0) {
    tags.push({
      text: `Audits: ${audits.length}`,
      icon: <ShieldCheckIcon />,
    });
  }

  if (hacks.length > 0) {
    tags.push({
      text: `Hacks: ${hacks.length}`,
      icon: <SkullIcon />,
    });
  }

  return tags;
};
