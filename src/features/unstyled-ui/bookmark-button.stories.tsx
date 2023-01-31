import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookmarkButton } from './bookmark-button';

export default {
  title: 'UNSTYLED/ui/BookmarkButton',
  component: BookmarkButton,
} as ComponentMeta<typeof BookmarkButton>;

const Template: ComponentStory<typeof BookmarkButton> = () => (
  <BookmarkButton />
);

export const Default = Template.bind({});
