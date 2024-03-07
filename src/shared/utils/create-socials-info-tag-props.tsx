import { SocialsInfo } from '~/shared/core/schemas';
import { EnabledTagsConfig, InfoTagProps } from '~/shared/core/types';
import { DiscordTagIcon } from '~/shared/components/icons/discord-tag-icon';
import { DocsTagIcon } from '~/shared/components/icons/docs-tag-icon';
import { GithubTagIcon } from '~/shared/components/icons/github-tag-icon';
import { TelegramTagIcon } from '~/shared/components/icons/telegram-tag-icon';
import { TwitterTagIcon } from '~/shared/components/icons/twitter-tag-icon';

import { getEnabledTagsConfig } from './get-enabled-tags-config';
import { getWebsiteText } from './get-website-text';

export const createSocialsInfoTagProps = (
  socials: Partial<SocialsInfo>,
  config?: EnabledTagsConfig<SocialsInfo>,
) => {
  const { website, github, twitter, telegram, docs, discord } = socials;

  const enabledTagsConfig = getEnabledTagsConfig(socials, config);

  const tags: InfoTagProps[] = [];

  if (website && enabledTagsConfig.website) {
    const { hostname, link } = getWebsiteText(website);
    tags.push({
      text: hostname,
      icon: null,
      link,
      showExternalIcon: true,
    });
  }

  if (github && enabledTagsConfig.github) {
    tags.push({
      text: 'Github',
      icon: <GithubTagIcon />,
      link: `https://github.com/${github}`,
    });
  }

  if (twitter && enabledTagsConfig.twitter) {
    tags.push({
      text: 'Twitter',
      icon: <TwitterTagIcon />,
      link: `https://twitter.com/${twitter}`,
    });
  }

  if (telegram && enabledTagsConfig.telegram) {
    tags.push({
      text: 'Telegram',
      icon: <TelegramTagIcon />,
      link: `https://telegram.me/${telegram}`,
    });
  }

  if (docs && enabledTagsConfig.docs) {
    tags.push({
      text: 'Docs',
      icon: <DocsTagIcon />,
      link: docs,
    });
  }

  if (discord && enabledTagsConfig.discord) {
    tags.push({
      text: 'Discord',
      icon: <DiscordTagIcon />,
      link: discord,
    });
  }

  return tags;
};
