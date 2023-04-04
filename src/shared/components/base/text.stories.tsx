import { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'components/base/Textx',
  args: {
    children: 'Hello World',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const SizeXS: Story = {
  args: {
    size: 'xs',
  },
};

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

export const FontWeightMedium: Story = {
  args: {
    fw: 'medium',
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
