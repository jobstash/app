import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Base/Avatar',
  args: {
    src: `https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`,
    size: 'md',
    alt: 'Test Avatar',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
