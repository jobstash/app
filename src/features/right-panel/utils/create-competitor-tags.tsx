import {
  CategoryIcon,
  CurrencyCircleDollarIcon,
  DiscordIcon,
  GithubLogoIcon,
  RevenueIcon,
  TelegramIcon,
  TwitterIcon,
  UsersThreeIcon,
} from '~/shared/components';
import type { Competitor, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createCompetitorTags = (competitor: Competitor) => {
  const {
    defiLlamaSlug,
    url,
    telegram,
    twitter,
    discord,
    githubOrganization,
    category,
    teamSize,
    tvl,
    monthlyVolume,
    monthlyRevenue,
    monthlyFees,
  } = competitor;

  const topTags: TagElement[] = [];
  const bottomTags: TagElement[] = [];

  if (defiLlamaSlug) {
    topTags.push({
      text: defiLlamaSlug,
      icon: null,
      showLinkIcon: true,
      asLink: true,
      link: url,
    });
  }

  if (githubOrganization) {
    topTags.push({
      text: 'Github',
      icon: <GithubLogoIcon />,
      showLinkIcon: false,
      asLink: true,
      link: githubOrganization,
    });
  }

  if (telegram) {
    topTags.push({
      text: 'Telegram',
      icon: <TelegramIcon />,
      showLinkIcon: false,
      asLink: true,
      link: telegram,
    });
  }

  if (twitter) {
    topTags.push({
      text: 'Twitter',
      icon: <TwitterIcon />,
      showLinkIcon: false,
      asLink: true,
      link: twitter,
    });
  }

  if (discord) {
    topTags.push({
      text: 'Discord',
      icon: <DiscordIcon />,
      showLinkIcon: false,
      asLink: true,
      link: discord,
    });
  }

  if (category) {
    bottomTags.push({
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (teamSize) {
    bottomTags.push({
      text: `Team Size: ${teamSize}`,
      icon: <UsersThreeIcon />,
    });
  }

  if (tvl) {
    bottomTags.push({
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <UsersThreeIcon />,
    });
  }

  if (monthlyVolume) {
    bottomTags.push({
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <CurrencyCircleDollarIcon />,
    });
  }

  if (monthlyRevenue) {
    bottomTags.push({
      text: `Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });
  }

  if (monthlyFees) {
    bottomTags.push({
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <CurrencyCircleDollarIcon />,
    });
  }

  return { topTags, bottomTags };
};
