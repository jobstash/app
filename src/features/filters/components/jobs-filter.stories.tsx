import type { Meta, StoryObj } from '@storybook/react';

import { JobsFilter } from './jobs-filter';

const meta: Meta<typeof JobsFilter> = {
  component: JobsFilter,
  title: 'Features/Filters/JobsFilter',
  render: () => <JobsFilter />,
};

export default meta;

type Story = StoryObj<typeof JobsFilter>;

export const Default: Story = {};
