import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';

import { capitalize } from '~/shared/utils/capitalize';

import { fakeProjectAllInfo } from '~/shared/testutils/fake-project-info';
import { fakeTag } from '~/shared/testutils/fake-tags';

import { JobCard } from '~/jobs/components/job-card';

import { fakeJobDetails } from '~/jobs/testutils/fake-job-details';
import { fakeJobOrg } from '~/jobs/testutils/fake-job-org';

faker.seed(69);

const meta = {
  title: 'jobs/job-card',
  component: JobCard,
  decorators: [
    (Story) => (
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const jobDetails = fakeJobDetails();

export const Default: Story = {
  args: {
    job: jobDetails,
  },
};

export const NoProjects: Story = {
  args: {
    job: {
      ...jobDetails,
      organization: {
        ...jobDetails.organization,
        projects: [],
      },
    },
  },
};

export const LongJobTitle: Story = {
  args: {
    job: { ...jobDetails, title: faker.lorem.words(16) },
  },
};

export const LongOrgName: Story = {
  args: {
    job: {
      ...jobDetails,
      organization: {
        ...fakeJobOrg(),
        name: capitalize(faker.lorem.words(8)),
      },
    },
  },
};

export const LongProjectName: Story = {
  args: {
    job: {
      ...jobDetails,
      organization: {
        ...jobDetails.organization,
        projects: [
          {
            ...fakeProjectAllInfo(),
            name: capitalize(faker.lorem.words(8)),
          },
        ],
      },
    },
  },
};

export const NoInfoTags: Story = {
  args: {
    job: {
      ...jobDetails,
      seniority: null,
      salary: null,
      minimumSalary: null,
      maximumSalary: null,
      salaryCurrency: null,
      location: null,
      locationType: null,
      commitment: null,
      paysInCrypto: null,
      offersTokenAllocation: null,
      classification: null,
    },
  },
};

export const NoTags: Story = {
  args: {
    job: {
      ...jobDetails,
      tags: [],
    },
  },
};

export const FewTags: Story = {
  args: {
    job: {
      ...jobDetails,
      tags: jobDetails.tags.slice(0, 3),
    },
  },
};

export const ManyTags: Story = {
  args: {
    job: {
      ...jobDetails,
      tags: Array.from({ length: 32 }).map(() => fakeTag()),
    },
  },
};
