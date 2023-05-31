import { type Competitor } from '@jobstash/competitors/core';
import { TAG_ELEMENT_ID, TagElement } from '@jobstash/shared/core';
import { numFormatter } from '@jobstash/shared/utils';

import {
  CategoryIcon,
  CurrencyCircleDollarIcon,
  DiscordIcon,
  GithubLogoIcon,
  RevenueIcon,
  TelegramIcon,
  TwitterIcon,
  UsersThreeIcon,
} from '@jobstash/shared/ui';

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
      id: TAG_ELEMENT_ID.defiLlama,
      text: defiLlamaSlug,
      icon: null,
      showLinkIcon: true,
      asLink: true,
      link: url,
    });
  }

  if (githubOrganization) {
    topTags.push({
      id: TAG_ELEMENT_ID.github,
      text: 'Github',
      icon: <GithubLogoIcon />,
      showLinkIcon: false,
      asLink: true,
      link: githubOrganization,
    });
  }

  if (telegram) {
    topTags.push({
      id: TAG_ELEMENT_ID.telegram,
      text: 'Telegram',
      icon: <TelegramIcon />,
      showLinkIcon: false,
      asLink: true,
      link: telegram,
    });
  }

  if (twitter) {
    topTags.push({
      id: TAG_ELEMENT_ID.twitter,
      text: 'Twitter',
      icon: <TwitterIcon />,
      showLinkIcon: false,
      asLink: true,
      link: twitter,
    });
  }

  if (discord) {
    topTags.push({
      id: TAG_ELEMENT_ID.discord,
      text: 'Discord',
      icon: <DiscordIcon />,
      showLinkIcon: false,
      asLink: true,
      link: discord,
    });
  }

  if (category) {
    bottomTags.push({
      id: TAG_ELEMENT_ID.category,
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
    });
  }

  if (teamSize) {
    bottomTags.push({
      id: TAG_ELEMENT_ID.teamSize,
      text: `Team Size: ${teamSize}`,
      icon: <UsersThreeIcon />,
    });
  }

  if (tvl) {
    bottomTags.push({
      id: TAG_ELEMENT_ID.tvl,
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <UsersThreeIcon />,
    });
  }

  if (monthlyVolume) {
    bottomTags.push({
      id: TAG_ELEMENT_ID.monthlyVolume,
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <CurrencyCircleDollarIcon />,
    });
  }

  if (monthlyRevenue) {
    bottomTags.push({
      id: TAG_ELEMENT_ID.monthlyRevenue,
      text: `Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });
  }

  if (monthlyFees) {
    bottomTags.push({
      id: TAG_ELEMENT_ID.monthlyFees,
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <CurrencyCircleDollarIcon />,
    });
  }

  return { topTags, bottomTags };
};
