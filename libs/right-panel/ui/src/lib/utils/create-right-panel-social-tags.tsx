import { type Organization } from '@jobstash/organizations/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';

import {
  DiscordIcon,
  DocsIcon,
  GithubLogoOutlineIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
} from '@jobstash/shared/ui';

export const createRightPanelSocialTags = (organization: Organization) => {
  const { github, twitter, telegram, discord, docs } = organization;

  const socials: TagElement[] = [];

  if (github) {
    socials.push({
      id: TAG_ELEMENT_ID.github,
      text: 'Github',
      icon: <GithubLogoOutlineIcon />,
      link: github,
    });
  }

  if (twitter) {
    socials.push({
      id: TAG_ELEMENT_ID.twitter,
      text: 'Twitter',
      icon: <TwitterIcon />,
      link: twitter,
    });
  }

  if (telegram) {
    socials.push({
      id: TAG_ELEMENT_ID.telegram,
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: telegram,
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

  //
  // if (linkedin) {
  //   socials.push({
  //     id: TAG_ELEMENT_ID.linkedin,
  //     text: 'LinkedIn',
  //     icon: <LinkedInIcon />,
  //     link: linkedin,
  //   });
  // }

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
