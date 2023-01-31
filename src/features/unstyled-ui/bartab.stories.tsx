import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './base/avatar';
import { Bartab } from './bartab';
import { CodeSidebarIcon } from './icons';

export default {
  component: Bartab,
  title: 'UNSTYLED/ui/Bartab',
  // Default Args
  args: {
    text: 'Continue with Github',
  },
} as ComponentMeta<typeof Bartab>;

const Template: ComponentStory<typeof Bartab> = (args) => (
  <div className="w-52">
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
  left: <CodeSidebarIcon />,
};

export const HasAvatar = Template.bind({});
HasAvatar.args = {
  text: '@0xDevoor',
  left: (
    <Avatar
      src={`https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`}
      size="xs"
      alt="Test"
    />
  ),
};
