import {
  CurrencyCircleDollarIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  SkullIcon,
  TvlIcon,
} from '~/shared/components';
import { Project, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createProjectTags = (project?: Project): TagElement[] => {
  if (!project) return [];

  const {
    tokenSymbol,
    tvl,
    monthlyVolume,
    monthlyFees,
    monthlyRevenue,
    hacks,
  } = project;

  const tags: TagElement[] = [];

  if (tokenSymbol)
    tags.push({ text: `$${tokenSymbol}`, icon: <CurrencyCircleDollarIcon /> });

  if (tvl)
    tags.push({ text: `TVL: $${numFormatter.format(tvl)}`, icon: <TvlIcon /> });

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

  if (hacks.length > 0) {
    tags.push({
      text: `Hacks: ${hacks.length}`,
      icon: <SkullIcon />,
    });
  }

  return tags;
};
