import type { Meta, StoryObj } from '@storybook/react';

import { CodeSidebarIcon } from '../icons';

import { Avatar } from './avatar';
import { Bartab } from './bartab';

const meta: Meta<typeof Bartab> = {
  component: Bartab,
  title: 'Components/UI/Bartab',
  render: (args) => (
    <div className="w-full">
      <Bartab {...args} />
    </div>
  ),
  args: {
    text: 'Continue with Github',
  },
};

export default meta;

type Story = StoryObj<typeof Bartab>;

export const Default: Story = {};

export const IsActive: Story = {
  args: {
    isActive: true,
  },
};

export const HasLeft: Story = {
  args: {
    text: 'Jobs',
    intent: 'secondary',
    left: <CodeSidebarIcon />,
  },
};

export const HasAvatar: Story = {
  args: {
    text: '@0xDevoor',
    intent: 'secondary',
    left: (
      <Avatar
        src={`https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`}
        size="xs"
        alt="Test"
      />
    ),
  },
};
