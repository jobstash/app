import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './base/avatar';
import { Bartab } from './bartab';
import { CodeSidebarIcon } from './icons';

const meta: Meta<typeof Bartab> = {
  component: Bartab,
  title: 'UNSTYLED/ui/Bartab',
  render: (args) => (
    <div className="w-52">
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
    left: <CodeSidebarIcon />,
  },
};

export const HasAvatar: Story = {
  args: {
    text: '@0xDevoor',
    left: (
      <Avatar
        src={`https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`}
        size="xs"
        alt="Test"
      />
    ),
  },
};
