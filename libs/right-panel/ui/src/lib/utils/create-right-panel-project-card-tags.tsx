import { type Project } from '@jobstash/projects/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';
import { numFormatter } from '@jobstash/shared/utils';

import {
  ActiveUsersIcon,
  CategoryIcon,
  DocsIcon,
  GithubLogoOutlineIcon,
  GlobeSimpleIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  TelegramIcon,
  TvlIcon,
  TwitterIcon,
  UsersThreeIcon,
} from '@jobstash/shared/ui';

export const createRightPanelProjectCardTags = (project: Project) => {
  const {
    url,
    githubOrganization,
    twitter,
    telegram,
    discord,
    docs,
    tvl,
    monthlyVolume,
    monthlyActiveUsers,
    monthlyFees,
    monthlyRevenue,
    teamSize,
    categories,
  } = project;

  const projectSocialTags: TagElement[] = [
    {
      id: TAG_ELEMENT_ID.website,
      text: 'Website',
      icon: <GlobeSimpleIcon />,
      link: url,
      showLinkIcon: false,
      asLink: true,
    },
  ];

  if (githubOrganization) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.github,
      text: 'Github',
      icon: <GithubLogoOutlineIcon />,
      link: githubOrganization,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (twitter) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.twitter,
      text: 'Twitter',
      icon: <TwitterIcon />,
      link: twitter,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (telegram) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.telegram,
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: telegram,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (discord) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.discord,
      text: 'Discord',
      icon: <TelegramIcon />,
      link: discord,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (docs) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.docs,
      text: 'Documentation',
      icon: <DocsIcon />,
      link: docs,
      showLinkIcon: false,
      asLink: true,
    });
  }

  const projectTags: TagElement[] = [
    // {
    //   text: 'Relevant Repos: TBD',
    //   icon: <GithubLogoOutlineIcon />,
    //   link: '#',
    //   showLinkIcon: false,
    // },
  ];

  if (categories.length > 0) {
    projectTags.push({
      id: TAG_ELEMENT_ID.category,
      text: `Category: ${categories[0].name}`,
      icon: <CategoryIcon />,
    });
  }

  if (teamSize) {
    projectTags.push({
      id: TAG_ELEMENT_ID.teamSize,
      text: `Team Size: ${teamSize}`,
      icon: <UsersThreeIcon />,
    });
  }

  const projectTvlTags: TagElement[] = [];

  if (tvl) {
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.tvl,
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });
  }

  if (monthlyVolume) {
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyVolume,
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyActiveUsers) {
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyActiveUsers,
      text: `Monthly Active Users: ${numFormatter.format(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  if (monthlyFees) {
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyFees,
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyRevenue) {
    projectTvlTags.push({
      id: TAG_ELEMENT_ID.monthlyRevenue,
      text: `Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });
  }

  const projectAuditTags: TagElement[] = [
    // { text: 'Audits: Peckshield', icon: <ShieldCheckIcon />, link: '#' },
    // {
    //   text: 'Audits: Consensys Diligence',
    //   icon: <ShieldCheckIcon />,
    //   link: '#',
    // },
    // { text: 'Audits: SigmaPrime', icon: <ShieldCheckIcon />, link: '#' },
    // { text: 'Audits: Chainsecurity', icon: <ShieldCheckIcon />, link: '#' },
    // { text: 'Audits: Mixbytes', icon: <ShieldCheckIcon />, link: '#' },
    // { text: 'Hacks: Big Hack costing all TVL', icon: <SkullIcon />, link: '#' },
  ];

  return { projectSocialTags, projectTags, projectTvlTags, projectAuditTags };
};