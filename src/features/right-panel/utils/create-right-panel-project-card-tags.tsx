import {
  ActiveUsersIcon,
  CategoryIcon,
  DiscordIcon,
  GithubLogoIcon,
  GithubLogoOutlineIcon,
  GlobeIcon,
  LinkedinIcon,
  MonthlyVolumeIcon,
  RevenueIcon,
  ShieldCheckIcon,
  SkullIcon,
  SuitcaseIcon,
  TelegramIcon,
  TvlIcon,
  TwitterIcon,
  UsersThreeIcon,
} from '~/shared/components';
import { Project, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createRightPanelProjectCardTags = (project: Project) => {
  const {
    url,
    githubOrganization,
    twitter,
    telegram,
    discord,
    tvl,
    monthlyVolume,
    monthlyActiveUsers,
    monthlyFees,
    monthlyRevenue,
    defillamaSlug,
    teamSize,
  } = project;

  const projectSocialTags: TagElement[] = [
    {
      text: 'Website',
      icon: <GlobeIcon />,
      link: url,
      showLinkIcon: false,
      asLink: true,
    },
  ];

  if (githubOrganization) {
    projectSocialTags.push({
      text: 'Github',
      icon: <GithubLogoIcon />,
      link: githubOrganization,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (twitter) {
    projectSocialTags.push({
      text: 'Twitter',
      icon: <TwitterIcon />,
      link: twitter,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (telegram) {
    projectSocialTags.push({
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: telegram,
      showLinkIcon: false,
      asLink: true,
    });
  }

  if (discord) {
    projectSocialTags.push({
      text: 'Discord',
      icon: <TelegramIcon />,
      link: discord,
      showLinkIcon: false,
      asLink: true,
    });
  }

  const projectTags: TagElement[] = [
    {
      text: 'Jobs: TBD',
      icon: <SuitcaseIcon />,
      link: '#',
      showLinkIcon: false,
    },
    {
      text: 'Relevant Repos: TBD',
      icon: <GithubLogoOutlineIcon />,
      link: '#',
      showLinkIcon: false,
    },
  ];

  if (defillamaSlug) {
    projectTags.push({
      text: defillamaSlug,
      icon: null,
      link: url,
      asLink: true,
    });
  }

  projectTags.push({ text: 'Category: TBD', icon: <CategoryIcon /> });

  if (teamSize) {
    projectTags.push({
      text: `Team Size: ${teamSize}`,
      icon: <UsersThreeIcon />,
    });
  }

  const projectTvlTags: TagElement[] = [];

  if (tvl) {
    projectTvlTags.push({
      text: `TVL: $${numFormatter.format(tvl)}`,
      icon: <TvlIcon />,
    });
  }

  if (monthlyVolume) {
    projectTvlTags.push({
      text: `Monthly Volume: $${numFormatter.format(monthlyVolume)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyActiveUsers) {
    projectTvlTags.push({
      text: `Monthly Active Users: ${numFormatter.format(monthlyActiveUsers)}`,
      icon: <ActiveUsersIcon />,
    });
  }

  if (monthlyFees) {
    projectTvlTags.push({
      text: `Monthly Fees: $${numFormatter.format(monthlyFees)}`,
      icon: <MonthlyVolumeIcon />,
    });
  }

  if (monthlyRevenue) {
    projectTvlTags.push({
      text: `Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });
  }

  const projectAuditTags: TagElement[] = [
    { text: 'Audits: Peckshield', icon: <ShieldCheckIcon />, link: '#' },
    {
      text: 'Audits: Consensys Diligence',
      icon: <ShieldCheckIcon />,
      link: '#',
    },
    { text: 'Audits: SigmaPrime', icon: <ShieldCheckIcon />, link: '#' },
    { text: 'Audits: Chainsecurity', icon: <ShieldCheckIcon />, link: '#' },
    { text: 'Audits: Mixbytes', icon: <ShieldCheckIcon />, link: '#' },
    { text: 'Hacks: Big Hack costing all TVL', icon: <SkullIcon />, link: '#' },
  ];

  return { projectSocialTags, projectTags, projectTvlTags, projectAuditTags };
};
