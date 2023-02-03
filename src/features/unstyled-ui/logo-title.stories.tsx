import type { Meta, StoryObj } from '@storybook/react';

import { LogoTitle } from './logo-title';

const meta: Meta<typeof LogoTitle> = {
  component: LogoTitle,
  title: 'UNSTYLED/ui/LogoTitle',
  args: {
    name: 'Hello World',
    avatar: `https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`,
    size: 'lg',
  },
};

export default meta;

type Story = StoryObj<typeof LogoTitle>;

export const Default: Story = {};

export const WithLocation: Story = {
  args: {
    location: 'Somewhere, Earth',
  },
};
