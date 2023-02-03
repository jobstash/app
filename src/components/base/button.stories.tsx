import type { Meta, StoryObj } from '@storybook/react';

import { BookmarkSidebarIcon, CaretDown } from '../icons';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Base/Button',
  render: (args) => (
    <div className="w-16">
      <Button {...args} />
    </div>
  ),
  args: {
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    kind: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    kind: 'outlined',
  },
};

export const IsActive: Story = {
  args: {
    isActive: true,
  },
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const HasLeft: Story = {
  args: {
    left: <CaretDown />,
  },
};

export const HasRight: Story = {
  args: {
    right: <CaretDown />,
  },
};

export const IconButton: Story = {
  args: {
    children: <BookmarkSidebarIcon />,
  },
};
