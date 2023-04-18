import type { Meta, StoryObj } from '@storybook/react';

import TechWrapper from './tech-wrapper';

const meta: Meta<typeof TechWrapper> = {
  component: TechWrapper,
  title: 'components/base/TechWrapper',
};

export default meta;

type Story = StoryObj<typeof TechWrapper>;

export const Default: Story = {
  args: {
    id: 'f1a5d7d0-cf2e-4553-bc2e-fd2cfd8ab0a2',
    children: 'Default',
  },
};
