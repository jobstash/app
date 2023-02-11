import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Components/Base/Dropdown',
  args: {
    text: 'Level',
    items: [
      { label: 'Staff' },
      { label: 'Lead' },
      { label: 'Senior' },
      { label: 'Medior' },
      { label: 'Junior' },
      { label: 'Intern' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};
