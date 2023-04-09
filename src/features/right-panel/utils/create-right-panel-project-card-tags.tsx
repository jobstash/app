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
  TvlIcon,
  TwitterIcon,
  UsersThreeIcon,
} from '~/shared/components';
import { Project, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createRightPanelProjectCardTags = (project: Project) => {
  const { tvl, monthlyVolume, monthlyFees, monthlyRevenue, defillamaSlug } =
    project;

  const projectSocialTags: TagElement[] = [
    { text: 'Website', icon: <GlobeIcon />, link: '#', showLinkIcon: false },
    {
      text: 'Github',
      icon: <GithubLogoIcon />,
      link: '#',
      showLinkIcon: false,
    },
    { text: 'Twitter', icon: <TwitterIcon />, link: '#', showLinkIcon: false },
    {
      text: 'Linkedin',
      icon: <LinkedinIcon />,
      link: '#',
      showLinkIcon: false,
    },
    { text: 'Discord', icon: <DiscordIcon />, link: '#', showLinkIcon: false },
  ];

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

  if (defillamaSlug)
    projectTags.push({
      text: defillamaSlug,
      icon: null,
      link: '#',
    });

  projectTags.push(
    { text: 'Category: TBD', icon: <CategoryIcon /> },
    { text: 'Team Size: TBD', icon: <UsersThreeIcon /> },
  );

  const projectTvlTags: TagElement[] = [];

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

  projectTvlTags.push({ text: 'Active Users: TBD', icon: <ActiveUsersIcon /> });

  if (monthlyRevenue)
    projectTvlTags.push({
      text: `Revenue: $${numFormatter.format(monthlyRevenue)}`,
      icon: <RevenueIcon />,
    });

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
