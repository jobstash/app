import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Components/Base/Select',
  render: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <Select
        items={['Staff', 'Lead', 'Senior', 'Medior', 'Junior', 'Intern']}
        ariaLabel="Filter by level"
      />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};
