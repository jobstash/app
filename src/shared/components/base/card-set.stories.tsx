import type { Meta, StoryObj } from '@storybook/react';

import {
  BankIcon,
  BriefcaseIcon,
  CategoryIcon,
  CodeIcon,
  GithubLogoIcon,
  MoneyIcon,
  ShieldCheckIcon,
  SkullIcon,
  UsersThreeIcon,
} from '../icons';

import { CardSet } from './card-set';

const meta: Meta<typeof CardSet> = {
  component: CardSet,
  title: 'components/base/CardSet',
  render: (args) => (
    <div>
      <CardSet {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof CardSet>;

export const Jobs: Story = {
  args: {
    icon: <BriefcaseIcon />,
    children: 'Jobs: 6',
    link: '#',
  },
};

export const Projects: Story = {
  args: {
    icon: <CodeIcon />,
    children: 'Projects: 3',
    link: '#',
  },
};

export const Repositories: Story = {
  args: {
    icon: <GithubLogoIcon />,
    children: 'Repositories: 2',
    link: '#',
  },
};

export const Employees: Story = {
  args: {
    icon: <UsersThreeIcon />,
    children: 'Employees: 14',
  },
};

export const Category: Story = {
  args: {
    icon: <CategoryIcon />,
    children: 'Category: DEX',
  },
};

export const LastFunding: Story = {
  args: {
    icon: <MoneyIcon />,
    children: 'Last Funding: $3M',
  },
};

export const FundingDate: Story = {
  args: {
    icon: <BankIcon />,
    children: 'Funding Date: 28 Oct, 2022',
  },
};

export const SigmaPrime: Story = {
  args: {
    icon: <ShieldCheckIcon />,
    children: 'SigmaPrime',
    link: '#',
  },
};

export const BigHack: Story = {
  args: {
    icon: <SkullIcon />,
    children: 'Big Hack costing all TVL',
    link: '#',
  },
};
