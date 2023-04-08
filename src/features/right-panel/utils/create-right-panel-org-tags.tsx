import {
  DiscordIcon,
  GithubLogoOutlineIcon,
  GlobeSimpleIcon,
  LinkedinIcon,
  LocationIcon,
  TelegramIcon,
  TwitterIcon,
  UsersIcon,
} from '~/shared/components';
import { Organization, TagElement } from '~/shared/core/interfaces';

export const createRightPanelOrgTags = (org: Organization) => {
  const {
    url,
    location,
    teamSize,
    githubOrganization,
    twitter,
    telegram,
    discord,
    linkedin,
  } = org;

  const orgTags: TagElement[] = [
    {
      text: 'Website',
      icon: <GlobeSimpleIcon />,
      link: url,
    },
    {
      text: location,
      icon: <LocationIcon />,
    },
  ];

  if (teamSize && teamSize !== 'undefined')
    orgTags.push({
      text: `Team Size: ${teamSize}`,
      icon: <UsersIcon />,
    });

  const orgSocials: TagElement[] = [];

  if (githubOrganization)
    orgSocials.push({
      text: 'Github',
      icon: <GithubLogoOutlineIcon />,
      link: githubOrganization,
    });

  if (twitter)
    orgSocials.push({ text: 'Twitter', icon: <TwitterIcon />, link: twitter });

  if (telegram)
    orgSocials.push({
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: telegram,
    });

  // **Note**: waiting for backend/middleware to implement "Docs"

  if (discord)
    orgSocials.push({ text: 'Discord', icon: <DiscordIcon />, link: discord });

  if (linkedin)
    orgSocials.push({
      text: 'LinkedIn',
      icon: <LinkedinIcon />,
      link: linkedin,
    });

  return { orgTags, orgSocials };
};
