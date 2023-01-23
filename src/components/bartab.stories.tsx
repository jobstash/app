import { ComponentMeta, ComponentStory } from '@storybook/react';

import Bartab from './bartab';

export default {
  title: 'components/bartab',
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Bartab>;

const Template: ComponentStory<typeof Bartab> = (args) => (
  <Bartab {...args}>Jobs</Bartab>
);

export const Tab = Template.bind({});
Tab.args = {
  kind: 'tab',
};

export const Profile = Template.bind({});
Profile.args = {
  kind: 'profile',
};

export const Link = Template.bind({});
Link.args = {
  kind: 'link',
};
