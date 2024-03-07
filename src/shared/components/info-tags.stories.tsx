import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';

import {
  fakeJobCardInfoTags,
  fakeOrgDetailsInfoTags,
  fakeSocialInfoTags,
} from '~/shared/testutils/fake-info-tags';

import { InfoTags } from './info-tags';

faker.seed(69);

const meta = {
  title: 'shared/info-tags',
  component: InfoTags,
} satisfies Meta<typeof InfoTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const JobCard: Story = {
  args: {
    tags: [
      ...fakeJobCardInfoTags(),
      ...fakeJobCardInfoTags(),
      ...fakeJobCardInfoTags(),
    ],
    compact: true,
  },
};

export const OrgDetails: Story = {
  args: {
    tags: fakeOrgDetailsInfoTags(),
  },
};

export const Socials: Story = {
  args: {
    tags: fakeSocialInfoTags(),
  },
};
