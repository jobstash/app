import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SideBar } from './sidebar';

export default {
  component: SideBar,
  title: 'Components/Layout/Sidebar',
  // Default Args
  args: {
    text: 'Continue with Github',
  },
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => (
  <div className="w-full">
    <SideBar {...args} />
  </div>
);

export const Default = Template.bind({});
