import { Meta, StoryObj } from '@storybook/react';

import { Button } from './buttonx';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'components/base/Buttonx',
  render: (args) => (
    <div className="w-24">
      <Button {...args} />
    </div>
  ),
  args: {
    children: 'Button',
  },
  argTypes: {
    isActive: { type: 'boolean', defaultValue: false },
    isDisabled: { type: 'boolean', defaultValue: false },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

//
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
  },
};
