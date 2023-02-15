import type { Meta, StoryObj } from '@storybook/react';

import { SidebarIcon } from '../icons';

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

export const Default: Story = {
  args: {
    intent: 'primary',
  }
};

export const HasLeft: Story = {
  args: {
    text: 'Jobs',
    intent: 'secondary',
    left: <SidebarIcon filename="jobs" />,
  },
};

export const HasAvatar: Story = {
  args: {
    text: '@0xDevoor',
    intent: 'secondary',
    left: <Avatar src="/user/@OxDevoor.png" size="xs" alt="Test" />,
  },
};

export const IsActive: Story = {
  args: {
    intent: 'primary',
    isActive: true,
  },
};

export const Wallet: Story = {
  args: {
    text: '@0xDevoor',
    intent: 'wallet',
  },
};

export const WalletIsActive: Story = {
  args: {
    text: '@0xDevoor',
    intent: 'wallet',
    isActive: true,
  },
};