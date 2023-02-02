import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from './text';

export default {
  component: Text,
  title: 'Components/Base/Text',
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => (
  <Text {...args}>Hello World</Text>
);

export const Default = Template.bind({});
