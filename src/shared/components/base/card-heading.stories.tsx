import type { Meta, StoryObj } from '@storybook/react';

import { CardHeading } from './card-heading';

const meta: Meta<typeof CardHeading> = {
  component: CardHeading,
  title: 'Components/UI/CardHeading',
  render: (args) => (
    <div className="w-full">
      <CardHeading {...args} />
    </div>
  ),
  args: {
    children: 'Continue with Github',
  },
};

export default meta;

type Story = StoryObj<typeof CardHeading>;

export const Default: Story = {};
