import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookmarkSidebarIcon, CaretDown } from '../icons';

import { Button } from './button';

export default {
  component: Button,
  title: 'UNSTYLED/base/Button',
  // Default args
  args: {
    children: 'Button',
    variant: 'default',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
};

export const Outlined = Template.bind({});
Outlined.args = {
  kind: 'outlined',
};

export const IsActive = Template.bind({});
IsActive.args = {
  isActive: true,
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  isDisabled: true,
};

export const HasLeft = Template.bind({});
HasLeft.args = {
  left: <CaretDown />,
};

export const HasRight = Template.bind({});
HasRight.args = {
  right: <CaretDown />,
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: <BookmarkSidebarIcon />,
};
