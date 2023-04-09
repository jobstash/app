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
  const projectInfoTags: TagElement[] = [];
  const projectTvlTags: TagElement[] = [];
  const projectAuditTags: TagElement[] = [];

  if (!project) return { projectInfoTags, projectTvlTags, projectAuditTags };

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

  if (tokenSymbol)
    projectInfoTags.push({
      text: `Token: $${tokenSymbol}`,
      icon: <CurrencyCircleDollarIcon />,
      link: url,
    });

  projectInfoTags.push({
    text: 'Category: TBD',
    icon: <CategoryIcon />,
  });

  if (tvl)
    projectTvlTags.push({
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });

  if (monthlyVolume)
    projectTvlTags.push({
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyFees)
    projectTvlTags.push({
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });

  if (monthlyRevenue)
    projectTvlTags.push({
      text: `Monthly Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });

  if (audits.length > 0) {
    projectAuditTags.push({
      text: `Audits: ${audits.length}`,
      icon: <ShieldCheckIcon />,
    });
  }

  if (hacks.length > 0) {
    projectAuditTags.push({
      text: `Hacks: ${hacks.length}`,
      icon: <SkullIcon />,
    });
  }

  return { projectInfoTags, projectTvlTags, projectAuditTags };
};
