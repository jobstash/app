import { ProjectInfo } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { formatNumber } from '~/shared/utils/format-number';
import { getPluralText } from '~/shared/utils/get-plural-text';
import { ActiveUsersIcon } from '~/shared/components/icons/active-users-icon';
import { AuditsIcon } from '~/shared/components/icons/audits-icon';
import { CategoryIcon } from '~/shared/components/icons/category-icon';
import { HacksIcon } from '~/shared/components/icons/hacks-icon';
import { MainnetIcon } from '~/shared/components/icons/mainnet-icon';
import { MonthlyVolumeIcon } from '~/shared/components/icons/monthly-volume-icon';
import { RevenueIcon } from '~/shared/components/icons/revenue-icon';
import { TvlIcon } from '~/shared/components/icons/tvl-icon';

export const createProjectTags = (project: ProjectInfo) => {
  const upperTags: InfoTagProps[] = [];
  const midTags: InfoTagProps[] = [];

  const {
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
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (tvl) {
    upperTags.push({
      text: `TVL: $${formatNumber(tvl)}`,
      icon: <TvlIcon />,
    });
  }

  if (monthlyVolume) {
    upperTags.push({
      text: `Monthly Volume: $${formatNumber(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyActiveUsers) {
    upperTags.push({
      text: `Monthly Active Users: $${formatNumber(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  if (monthlyFees) {
    upperTags.push({
      text: `Monthly Fees: $${formatNumber(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyRevenue) {
    upperTags.push({
      text: `Monthly Revenue: $${formatNumber(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });
  }

  if (isMainnet) {
    upperTags.push({
      text: 'Mainnet',
      icon: <MainnetIcon />,
    });
  }

  if (audits.length > 0) {
    for (const audit of audits) {
      const issueCount = audit.techIssues ?? 0;
      const title = audit.name;
      midTags.push({
        text: `${getPluralText('Audit', issueCount)}: ${title}${
          issueCount
            ? ' (' + issueCount + ` ${getPluralText('issue', issueCount)})`
            : ''
        }`,
        icon: <AuditsIcon />,
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
        ? `($${formatNumber(hack.fundsLost)})`
        : '';
      midTags.push({
        text: `Hack: ${title} ${issueType} ${fundsLost}`,
        icon: <HacksIcon />,
      });
    }
  }

  return { upperTags, midTags };
};
