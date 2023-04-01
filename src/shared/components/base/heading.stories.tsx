import { Meta, StoryObj } from '@storybook/react';

import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'components/base/heading',
  args: {
    children: 'Hello World',
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const SizeSM: Story = {
  args: {
    size: 'sm',
  },
};

export const SizeMD: Story = {
  args: {
    size: 'md',
  },
};

export const SizeLG: Story = {
  args: {
    size: 'lg',
  },
};

export const SizeXL: Story = {
  args: {
    size: 'xl',
  },
};

export const FontWeightNormal: Story = {
  args: {
    fw: 'normal',
  },
};

export const FontWeightSemibold: Story = {
  args: {
    fw: 'semibold',
  },
};

export const FontWeightBold: Story = {
  args: {
    fw: 'bold',
  },
};
