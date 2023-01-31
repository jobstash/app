import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { DollarTagIcon, WebsiteTagIcon } from './icons';
import { TagButton } from './tag-button';

export default {
  title: 'UNSTYLED/ui/TagButton',
  component: TagButton,
  // Default args
  args: {
    text: 'Tag Button',
  },
} as ComponentMeta<typeof TagButton>;

const Template: ComponentStory<typeof TagButton> = (args) => (
  <TagButton {...args} />
);

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <WebsiteTagIcon />,
  text: '6 Jobs',
};

const SAMPLE_LINK = 'google.com';

export const Link = Template.bind({});
Link.args = {
  link: SAMPLE_LINK,
  text: 'uniswap.org',
};

export const LinkWithIcon = Template.bind({});
LinkWithIcon.args = {
  link: SAMPLE_LINK,
  icon: <DollarTagIcon />,
  text: '$UNI',
};
