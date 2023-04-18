import { Meta, StoryObj } from '@storybook/react';

import {
  JobsSidebarIcon,
  OrgSidebarIcon,
  ProjectsSidebarIcon,
  ReposSidebarIcon,
} from '../icons';
import { BookmarksSidebarIcon } from '../icons/bookmarks-sidebar-icon';

import Avatar from './avatar';
import Bartab from './bartab';

const meta: Meta<typeof Bartab> = {
  component: Bartab,
  title: 'components/base/Bartab',
  args: {
    text: 'Bartab',
  },
  argTypes: {
    left: { type: 'function', defaultValue: null },
    right: { type: 'function', defaultValue: null },
    text: { type: 'string', defaultValue: 'Bartab' },
    isActive: { type: 'boolean', defaultValue: false },
  },
  render: (args) => (
    <div className="w-[178px]">
      <Bartab {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Bartab>;

export const Jobs: Story = {
  args: {
    text: 'Jobs',
    left: <JobsSidebarIcon />,
  },
};

export const Organizations: Story = {
  args: {
    text: 'Organizations',
    left: <OrgSidebarIcon />,
  },
};

export const Projects: Story = {
  args: {
    text: 'Projects',
    left: <ProjectsSidebarIcon />,
  },
};

export const Repositories: Story = {
  args: {
    text: 'Repositories',
    left: <ReposSidebarIcon />,
  },
};

export const SavedJobs: Story = {
  args: {
    text: 'Saved Jobs',
    left: <BookmarksSidebarIcon />,
  },
};

export const ConnectWallet: Story = {
  args: {
    text: 'Connect Wallet',
    left: null,
    right: null,
    variant: 'wallet',
  },
};

export const SignedInWallet: Story = {
  args: {
    text: '0xc37...2192',
    left: <Avatar src="/user/wallet-user.png" alt="User" size="sm" />,
    variant: 'wallet',
  },
};

export const Admin: Story = {
  args: {
    text: 'ADMIN',
    left: <Avatar src="/user/wallet-user.png" alt="User" size="sm" />,
    variant: 'wallet',
  },
};

export const WithoutIcon: Story = {
  args: {
    text: 'Without Icon',
  },
};
