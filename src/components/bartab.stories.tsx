import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './base/avatar';
import { Bartab } from './bartab';
import { CodeSidebarIcon } from './icons';

export default {
  component: Bartab,
  title: 'components/base/Bartab',
  // Default Args
  args: {
    text: 'Continue with Github',
  },
} as ComponentMeta<typeof Bartab>;

const Template: ComponentStory<typeof Bartab> = (args) => (
  <div className="w-full">
    <Bartab {...args} />
  </div>
);

export const Default = Template.bind({});

export const IsActive = Template.bind({});
IsActive.args = {
  isActive: true,
};

export const HasLeft = Template.bind({});
HasLeft.args = {
  text: 'Jobs',
  intent: "secondary",
  left: <CodeSidebarIcon />,
};

export const HasAvatar = Template.bind({});
HasAvatar.args = {
  text: '@0xDevoor',
  intent: "secondary",
  left: (
    <Avatar
      src={`https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`}
      size="xs"
      alt="Test"
    />
  ),
};
