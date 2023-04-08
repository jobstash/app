import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'components/base/Avatar',
  args: {
    src: `/orgs/Uniswap Labs.png`,
    size: 'md',
    alt: 'Test Avatar',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
