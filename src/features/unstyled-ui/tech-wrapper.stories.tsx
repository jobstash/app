import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TechWrapper } from './tech-wrapper';

export default {
  component: TechWrapper,
  title: 'UNSTYLED/ui/TechWrapper',
  // Default args
  args: {
    text: 'webgl',
    isParentActive: false,
  },
} as ComponentMeta<typeof TechWrapper>;

const Template: ComponentStory<typeof TechWrapper> = (args) => (
  <TechWrapper {...args} />
);

export const Default = Template.bind({});

export const IsChecked = Template.bind({});
IsChecked.args = {
  isChecked: true,
};
