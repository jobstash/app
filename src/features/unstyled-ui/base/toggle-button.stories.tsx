import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookmarkActiveButtonIcon, BookmarkButtonIcon } from '../icons';

import { ToggleButton } from './toggle-button';

export default {
  title: 'UNSTYLED/base/ToggleButton',
  component: ToggleButton,
  // Default args
  args: {
    children: 'Toggle OFF',
    activeEl: 'Toggle ON',
  },
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => (
  <ToggleButton {...args} />
);

export const Default = Template.bind({});
