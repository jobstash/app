import { Meta, StoryObj } from '@storybook/react';

import { BookmarkButton } from './bookmark-button';

const meta: Meta<typeof BookmarkButton> = {
  title: 'UNSTYLED/ui/BookmarkButton',
  component: BookmarkButton,
};

export default meta;

type Story = StoryObj<typeof BookmarkButton>;

export const Default: Story = {};
