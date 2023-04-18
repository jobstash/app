import type { Meta, StoryObj } from '@storybook/react';

import LogoTitle from './logo-title';

const meta: Meta<typeof LogoTitle> = {
  component: LogoTitle,
  title: 'components/base/LogoTitle',
  args: {
    title: 'Uniswap Labs',
    avatarProps: {
      src: `/orgs/Uniswap Labs.png`,
      alt: 'Uniswap Labs',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LogoTitle>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithLocation: Story = {
  args: {
    location: 'NYC, USA',
  },
};
