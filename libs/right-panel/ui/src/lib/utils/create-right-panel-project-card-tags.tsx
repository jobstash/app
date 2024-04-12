/* eslint-disable complexity */
import {
  type ProjectInfo,
  type ProjectMoreInfo,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import {
  getPluralText,
  getWebsiteText,
  numFormatter,
} from '@jobstash/shared/utils';

import {
  ActiveUsersIcon,
  CategoryIcon,
  DocsIcon,
  GithubLogoOutlineIcon,
  GlobeSimpleIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  ShieldCheckIcon,
  SkullIcon,
  TelegramIcon,
  TvlIcon,
  TwitterIcon,
} from '@jobstash/shared/ui';

export const createRightPanelProjectCardTags = (
  project: ProjectInfo & ProjectMoreInfo,
) => {
  const {
    website,
    github,
    twitter,
    telegram,
    discord,
    docs,
    tvl,
    monthlyVolume,
    monthlyActiveUsers,
    monthlyFees,
    monthlyRevenue,
    category,
    audits,
    hacks,
  } = project;

  const projectSocialTags: TagElement[] = [];

  if (website) {
    const { link } = getWebsiteText(website);
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.website,
      text: 'Website',
      icon: <GlobeSimpleIcon />,
      link,
      showLinkIcon: true,
      asLink: true,
    });
  }

  if (github) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.github,
      text: 'Github',
      icon: <GithubLogoOutlineIcon />,
      link: `https://github.com/${github}`,
      showLinkIcon: true,
      asLink: true,
    });
  }

  if (twitter) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.twitter,
      text: 'Twitter',
      icon: <TwitterIcon />,
      link: `https://twitter.com/${twitter}`,
      showLinkIcon: true,
      asLink: true,
    });
  }

  if (telegram) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.telegram,
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: `https://telegram.me/${telegram}`,
      showLinkIcon: true,
      asLink: true,
    });
  }

  if (discord) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.discord,
      text: 'Discord',
      icon: <TelegramIcon />,
      link: discord,
      showLinkIcon: true,
      asLink: true,
    });
  }

  if (docs) {
    projectSocialTags.push({
      id: TAG_ELEMENT_ID.docs,
      text: 'Documentation',
      icon: <DocsIcon />,
      link: docs,
      showLinkIcon: true,
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

  if (category) {
    projectTags.push({
      id: TAG_ELEMENT_ID.category,
      text: `Category: ${category}`,
      icon: <CategoryIcon />,
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

  const projectAuditTags: TagElement[] = [];

  if (audits.length > 0) {
    for (const audit of audits) {
      const issueCount = audit.techIssues ?? 0;
      const title = audit.name;
      projectAuditTags.push({
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
      projectAuditTags.push({
        id: `${TAG_ELEMENT_ID.hack} ${hack.id}`,
        text: `Hack: ${title} ${issueType} ${fundsLost}`,
        icon: <SkullIcon />,
      });
    }
  }

  return { projectSocialTags, projectTags, projectTvlTags, projectAuditTags };
};
