import { faker } from '@faker-js/faker';

import { JobApplicant } from '@jobstash/jobs/core';

const randomNullable = <T>(value: T) => (Math.random() < 0.3 ? null : value);

export const fakeApplicants = (): JobApplicant[] => {
  const count = faker.number.int({ min: 10, max: 40 });
  return Array.from({ length: count }, () => ({
    oss: faker.datatype.boolean(),
    interviewed: faker.datatype.boolean(),
    cryptoNative: faker.datatype.boolean(),
    cryptoAdjacent: faker.datatype.boolean(),
    upcomingTalent: faker.datatype.boolean(),
    calendly: randomNullable(faker.internet.url()),
    attestations: {
      upvotes: randomNullable(faker.number.int({ min: 0, max: 100 })),
      downvotes: randomNullable(faker.number.int({ min: 0, max: 100 })),
    },
    ecosystemActivations: Array.from(
      { length: faker.number.int({ min: 0, max: 4 }) },
      () => faker.hacker.verb(),
    ),
    appliedTimestamp: randomNullable(faker.date.recent().getTime()),
    note: randomNullable(faker.lorem.sentence()),
    user: {
      wallet: faker.finance.ethereumAddress(),
      githubAvatar: randomNullable(faker.image.avatarGitHub()),
      name: randomNullable(faker.person.fullName()),
      alternateEmails: Array.from(
        { length: faker.number.int({ min: 0, max: 4 }) },
        () => faker.internet.email(),
      ),
      location: {
        city: randomNullable(faker.location.city()),
        country: randomNullable(faker.location.country()),
      },
      availableForWork: randomNullable(faker.datatype.boolean()),
      linkedAccounts: {
        discord: randomNullable(faker.internet.userName()),
        telegram: randomNullable(faker.internet.userName()),
        google: null,
        apple: null,
        github: randomNullable(faker.internet.userName()),
        farcaster: null,
        twitter: randomNullable(faker.internet.userName()),
        email: randomNullable(faker.internet.email()),
        wallets: Array.from(
          { length: faker.number.int({ min: 0, max: 4 }) },
          () => faker.finance.ethereumAddress(),
        ),
      },
      skills: Array.from(
        { length: faker.number.int({ min: 0, max: 4 }) },
        () => ({
          id: faker.string.uuid(),
          name: faker.hacker.verb(),
          canTeach: faker.datatype.boolean(),
        }),
      ),
      showcases: Array.from(
        { length: faker.number.int({ min: 0, max: 4 }) },
        () => ({
          id: faker.string.uuid(),
          label: faker.commerce.productName(),
          url: faker.internet.url(),
        }),
      ),
      workHistory: Array.from(
        { length: faker.number.int({ min: 0, max: 4 }) },
        () => ({
          login: faker.internet.userName(),
          name: randomNullable(faker.company.name()),
          logoUrl: randomNullable(faker.image.business()),
          description: randomNullable(faker.lorem.sentence()),
          url: randomNullable(faker.internet.url()),
          firstContributedAt: faker.date.past().getTime(),
          lastContributedAt: faker.date.recent().getTime(),
          commitsCount: randomNullable(faker.number.int({ min: 0, max: 500 })),
          tenure: faker.number.int({ min: 1, max: 10 }),
          cryptoNative: faker.datatype.boolean(),
          repositories: Array.from(
            { length: faker.number.int({ min: 0, max: 4 }) },
            () => ({
              name: randomNullable(faker.commerce.productName()),
              url: faker.internet.url(),
              cryptoNative: faker.datatype.boolean(),
              firstContributedAt: faker.date.past().getTime(),
              lastContributedAt: faker.date.recent().getTime(),
              description: randomNullable(faker.lorem.sentence()),
              commitsCount: faker.number.int({ min: 1, max: 1000 }),
              skills: Array.from(
                { length: faker.number.int({ min: 0, max: 4 }) },
                () => faker.hacker.noun(),
              ),
              tenure: faker.number.int({ min: 1, max: 10 }),
              stars: faker.number.int({ min: 0, max: 1000 }),
              createdAt: faker.date.past().getTime(),
            }),
          ),
          createdAt: faker.date.past().getTime(),
        }),
      ),
      matchingSkills: randomNullable(faker.number.int({ min: 0, max: 10 })),
    },
    job: {
      shortUUID: faker.string.uuid(),
      title: faker.name.jobTitle(),
      classification: randomNullable(faker.name.jobType()),
      tags: Array.from(
        { length: faker.number.int({ min: 0, max: 4 }) },
        () => ({
          id: faker.string.uuid(),
          name: faker.hacker.noun(),
          normalizedName: faker.hacker.noun(),
        }),
      ),
    },
  }));
};
