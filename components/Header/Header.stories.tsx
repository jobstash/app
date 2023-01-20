import { StoryFn } from '@storybook/react';

import Header, { HeaderProps } from './index';

export default {
  title: 'Header',
  argTypes: { onSignIn: { action: 'clicked' } },
};

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const ContactLink = Template.bind({});

ContactLink.args = {
  links: [
    {
      title: 'Contact',
      url: '/contact',
    },
  ],
};
