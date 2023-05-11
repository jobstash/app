import type { Meta, StoryObj } from '@storybook/react';

import { RangeSlider } from './range-slider';

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
  title: 'Components/Base/RangeSlider',
  render: (args) => (
    <div className="flex h-screen w-screen items-center justify-center">
      <RangeSlider {...args} />
    </div>
  ),
  args: {
    defaultValue: [40, 60],
    min: 0,
    max: 100,
    step: 10,
  },
};

export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {};
