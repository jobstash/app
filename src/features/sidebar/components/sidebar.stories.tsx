import type { Meta, StoryObj } from '@storybook/react';

import { SideBar } from './sidebar';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  title: 'Components/Layout/Sidebar',
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {};
