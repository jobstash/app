import { type ProfileOrgReview } from '@jobstash/profile/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';

import {
  DiscordIcon,
  DocsIcon,
  GithubLogoOutlineIcon,
  TelegramIcon,
  TwitterIcon,
} from '@jobstash/shared/ui';

export const createOrgInfoSocials = (orgInfo: ProfileOrgReview['org']) => {
  const { github, twitter, telegram, discord, docs } = orgInfo;

  const socials: TagElement[] = [];

  if (github) {
    socials.push({
      id: TAG_ELEMENT_ID.github,
      text: 'Github',
      icon: <GithubLogoOutlineIcon />,
      link: `https://github.com/${github}`,
    });
  }

  if (twitter) {
    socials.push({
      id: TAG_ELEMENT_ID.twitter,
      text: 'Twitter',
      icon: <TwitterIcon />,
      link: `https://twitter.com/${twitter}`,
    });
  }

  if (telegram) {
    socials.push({
      id: TAG_ELEMENT_ID.telegram,
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: `https://telegram.me/${telegram}`,
    });
  }

  if (discord) {
    socials.push({
      id: TAG_ELEMENT_ID.discord,
      text: 'Discord',
      icon: <DiscordIcon />,
      link: discord,
    });
  }

  if (docs) {
    socials.push({
      id: TAG_ELEMENT_ID.docs,
      text: 'Documentation',
      icon: <DocsIcon />,
      link: docs,
    });
  }

  return socials;
};
