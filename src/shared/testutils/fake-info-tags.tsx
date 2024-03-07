import { faker } from '@faker-js/faker';

import { InfoTagProps } from '~/shared/core/types';
import { DiscordTagIcon } from '~/shared/components/icons/discord-tag-icon';
import { DocsTagIcon } from '~/shared/components/icons/docs-tag-icon';
import { GithubTagIcon } from '~/shared/components/icons/github-tag-icon';
import { LocationIcon } from '~/shared/components/icons/location-icon';
import { LocationTypeIcon } from '~/shared/components/icons/location-type-icon';
import { PaperBillIcon } from '~/shared/components/icons/paper-bill-icon';
import { SeniorityIcon } from '~/shared/components/icons/seniority-icon';
import { TelegramTagIcon } from '~/shared/components/icons/telegram-tag-icon';
import { TwitterTagIcon } from '~/shared/components/icons/twitter-tag-icon';
import { UsersThreeIcon } from '~/shared/components/icons/users-three-icon';

export const fakeJobCardInfoTags = (): InfoTagProps[] => [
  {
    text: 'Senior',
    icon: <SeniorityIcon />,
  },
  {
    text: 'USD 60-90K',
    icon: <PaperBillIcon />,
  },
  {
    text: 'Remote',
    icon: <LocationTypeIcon />,
  },
  {
    text: 'Employees: 14',
    icon: <UsersThreeIcon />,
  },
];

export const fakeOrgDetailsInfoTags = (): InfoTagProps[] => [
  {
    text: 'uniswap.org',
    link: 'https://uniswap.org',
    icon: null,
    showExternalIcon: true,
  },
  {
    text: 'NYC, USA',
    icon: <LocationIcon />,
  },
  {
    text: 'Team size: 88',
    icon: <UsersThreeIcon />,
  },
];

export const fakeSocialInfoTags = (): InfoTagProps[] => [
  {
    text: 'Github',
    link: faker.internet.url(),
    icon: <GithubTagIcon />,
  },
  {
    text: 'Twitter',
    link: faker.internet.url(),
    icon: <TwitterTagIcon />,
  },
  {
    text: 'Telegram',
    link: faker.internet.url(),
    icon: <TelegramTagIcon />,
  },
  {
    text: 'Docs',
    link: faker.internet.url(),
    icon: <DocsTagIcon />,
  },
  {
    text: 'Discord',
    link: faker.internet.url(),
    icon: <DiscordTagIcon />,
  },
];
