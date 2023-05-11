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
    children: 'Bartab',
  },
  argTypes: {
    left: { type: 'function', defaultValue: null },
    right: { type: 'function', defaultValue: null },
    children: { type: 'string', defaultValue: 'Bartab' },
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
    children: 'Jobs',
    left: <JobsSidebarIcon />,
  },
};

export const Organizations: Story = {
  args: {
    children: 'Organizations',
    left: <OrgSidebarIcon />,
  },
};

export const Projects: Story = {
  args: {
    children: 'Projects',
    left: <ProjectsSidebarIcon />,
  },
};

export const Repositories: Story = {
  args: {
    children: 'Repositories',
    left: <ReposSidebarIcon />,
  },
};

export const SavedJobs: Story = {
  args: {
    children: 'Saved Jobs',
    left: <BookmarksSidebarIcon />,
  },
};

export const ConnectWallet: Story = {
  args: {
    children: 'Connect Wallet',
    left: null,
    right: null,
    variant: 'wallet',
  },
};

export const SignedInWallet: Story = {
  args: {
    children: '0xc37...2192',
    left: <Avatar src="/user/wallet-user.png" alt="User" size="sm" />,
    variant: 'wallet',
  },
};

export const Admin: Story = {
  args: {
    children: 'ADMIN',
    left: <Avatar src="/user/wallet-user.png" alt="User" size="sm" />,
    variant: 'wallet',
  },
};

export const WithoutIcon: Story = {
  args: {
    children: 'Without Icon',
  },
};
