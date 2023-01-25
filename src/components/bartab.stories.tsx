import React from 'react';

import { Story } from '@storybook/react';

import { Bartab, BartabProps } from '../components/bartab';

export default {
  title: 'Components/Bartab',
  component: Bartab,
};

const Template: Story<BartabProps> = (args) => <Bartab {...args} />;

export const Link = Template.bind({});
Link.args = {
  children: 'Bartab component',
};

export const Tab = () => (
  <Bartab label="" variant="link" leftSection={undefined} onClick={undefined}>
    hello
  </Bartab>
);

export const Profile = () => (
  <Bartab label="" variant="link" leftSection={undefined} onClick={undefined}>
    hello
  </Bartab>
);
