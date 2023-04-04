import { Meta, StoryObj } from '@storybook/react';

import { CaretDownIcon, FilterIcon } from '../icons';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'components/base/Buttonx',
  args: {
    children: 'Button',
  },
  argTypes: {
    isActive: { type: 'boolean', defaultValue: false },
    isDisabled: { type: 'boolean', defaultValue: false },
    left: { type: 'function', defaultValue: null },
    right: { type: 'function', defaultValue: null },
    children: { type: 'function', defaultValue: null },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

//
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Apply Filters',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Clear Filters',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
  },
};

export const LeftIcon: Story = {
  args: {
    left: <FilterIcon />,
    variant: 'outline',
    isActive: true,
    children: 'Filters & Sorting',
  },
};

export const RightIcon: Story = {
  args: {
    right: <CaretDownIcon />,
    variant: 'outline',
    children: 'Sort By',
  },
};

export const IconOnly: Story = {
  args: {
    children: <CaretDownIcon />,
    isIcon: true,
  },
};
