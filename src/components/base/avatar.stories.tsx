import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './avatar';

export default {
  component: Avatar,
  title: 'UNSTYLED/base/Avatar',
  // Default Args
  args: {
    src: `https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`,
    size: 'md',
    alt: 'Test Avatar',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
