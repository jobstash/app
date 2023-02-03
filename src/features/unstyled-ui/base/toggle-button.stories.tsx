import type { Meta, StoryObj } from '@storybook/react';

import { ToggleButton } from './toggle-button';

const meta: Meta<typeof ToggleButton> = {
  title: 'UNSTYLED/base/ToggleButton',
  component: ToggleButton,
  args: {
    children: 'Toggle OFF',
    activeEl: 'Toggle ON',
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {};
