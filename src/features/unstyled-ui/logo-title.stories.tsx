import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LogoTitle } from './logo-title';

export default {
  component: LogoTitle,
  title: 'UNSTYLED/ui/LogoTitle',
  // Default Args
  args: {
    name: 'Hello World',
    avatar: `https://api.dicebear.com/5.x/bottts/svg?seed=${Date.now()}`,
    size: 'lg',
  },
} as ComponentMeta<typeof LogoTitle>;

const Template: ComponentStory<typeof LogoTitle> = (args) => (
  <LogoTitle {...args} />
);

export const Default = Template.bind({});

export const WithLocation = Template.bind({});
WithLocation.args = {
  location: 'Somewhere, Earth',
};
