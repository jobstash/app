import type { Meta, StoryObj } from '@storybook/react';

import { DollarTagIcon, WebsiteTagIcon } from './icons';
import { TagButton } from './tag-button';

const meta: Meta<typeof TagButton> = {
  title: 'UNSTYLED/ui/TagButton',
  component: TagButton,
  args: {
    text: 'Tag Button',
  },
};

export default meta;

type Story = StoryObj<typeof TagButton>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <WebsiteTagIcon />,
    text: '6 Jobs',
  },
};

const SAMPLE_LINK = 'google.com';

export const Link: Story = {
  args: {
    link: SAMPLE_LINK,
    text: 'uniswap.org',
  },
};

export const LinkWithIcon: Story = {
  args: {
    link: SAMPLE_LINK,
    icon: <DollarTagIcon />,
    text: '$UNI',
  },
};
