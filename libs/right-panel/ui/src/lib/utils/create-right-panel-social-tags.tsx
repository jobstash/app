import {
  Socials,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';

import {
  DiscordIcon,
  DocsIcon,
  GithubLogoOutlineIcon,
  TelegramIcon,
  TwitterIcon,
} from '@jobstash/shared/ui';

export const createRightPanelSocialTags = (socials: Socials) => {
  const { github, twitter, telegram, discord, docs } = socials;

  const tags: TagElement[] = [];

  if (github) {
    tags.push({
      id: TAG_ELEMENT_ID.github,
      text: 'Github',
      icon: <GithubLogoOutlineIcon />,
      link: `https://github.com/${github}`,
    });
  }

  if (twitter) {
    tags.push({
      id: TAG_ELEMENT_ID.twitter,
      text: 'Twitter',
      icon: <TwitterIcon />,
      link: `https://twitter.com/${twitter}`,
    });
  }

  if (telegram) {
    tags.push({
      id: TAG_ELEMENT_ID.telegram,
      text: 'Telegram',
      icon: <TelegramIcon />,
      link: `https://telegram.me/${telegram}`,
    });
  }

  if (discord) {
    tags.push({
      id: TAG_ELEMENT_ID.discord,
      text: 'Discord',
      icon: <DiscordIcon />,
      link: discord,
    });
  }

  //
  // if (linkedin) {
  //   tags.push({
  //     id: TAG_ELEMENT_ID.linkedin,
  //     text: 'LinkedIn',
  //     icon: <LinkedInIcon />,
  //     link: linkedin,
  //   });
  // }

  if (docs) {
    tags.push({
      id: TAG_ELEMENT_ID.docs,
      text: 'Documentation',
      icon: <DocsIcon />,
      link: docs,
    });
  }

  return tags;
};
