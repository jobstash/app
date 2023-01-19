import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Bartab } from "./Bartab";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Bartab",
  component: Bartab,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof Bartab>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Bartab> = (args) => <Bartab {...args} />;

export const Link = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Link.args = {
  label: "Bartab",
};

export const Tab = Template.bind({});
Tab.args = {
  label: "Bartab",
};

export const Profile = Template.bind({});
Profile.args = {
  label: "Bartab",
};
