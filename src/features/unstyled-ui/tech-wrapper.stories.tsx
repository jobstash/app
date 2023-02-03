import type { Meta, StoryObj } from '@storybook/react';

import { TechWrapper } from './tech-wrapper';

const meta: Meta<typeof TechWrapper> = {
  component: TechWrapper,
  title: 'UNSTYLED/ui/TechWrapper',
  args: {
    text: 'webgl',
  },
};

export default meta;

type Story = StoryObj<typeof TechWrapper>;

export const Default: Story = {};

export const IsChecked: Story = {
  args: {
    isChecked: true,
  },
};
