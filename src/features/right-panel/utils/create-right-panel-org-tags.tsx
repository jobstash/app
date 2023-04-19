import {
  BankIcon,
  DiscordIcon,
  GithubLogoOutlineIcon,
  GlobeSimpleIcon,
  LinkedinIcon,
  LocationIcon,
  TelegramIcon,
  TwitterIcon,
  UsersIcon,
} from '~/shared/components';
import {
  FundingRound,
  Organization,
  TagElement,
} from '~/shared/core/interfaces';

import { createOrgFundingDateString } from './create-org-funding-date-string';

export const createRightPanelOrgTags = (
  org: Organization,
  fundingDateTs: number,
) => {
  const {
    url,
    location,
    headCount,
    githubOrganization,
    twitter,
    telegram,
    discord,
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

  if (headCount) {
    orgTags.push({
      text: `Team Size: ${headCount}`,
      icon: <UsersIcon />,
    });
  }

  if (fundingDateTs !== -1) {
    orgTags.push({
      text: createOrgFundingDateString(fundingDateTs),
      icon: <BankIcon />,
    });
  }

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

  if (discord)
    orgSocials.push({ text: 'Discord', icon: <DiscordIcon />, link: discord });

  return { orgTags, orgSocials };
};
