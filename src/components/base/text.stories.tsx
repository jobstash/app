import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Components/Base/Text',
  args: {
    children: 'Hello World',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};
