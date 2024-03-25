import { faker } from '@faker-js/faker';
import { fakeNullable } from '@jobstash/shared/testutils';

import { JobApplicant } from '@jobstash/jobs/core';

faker.seed(69_420);

export const fakeJobApplicant = (): JobApplicant => {
  const { username, email } = fakeApplicantHandle();
  const preferredContact = faker.helpers.arrayElement([
    'Email',
    'Twitter',
    'Discord',
    'Telegram',
  ]);

  return {
    user: {
      wallet: faker.finance.bitcoinAddress(),
      avatar: fakeNullable(faker.image.avatar()),
      username,
      email,
      availableForWork: faker.datatype.boolean(),
      location: {
        city: fakeNullable(faker.location.city()),
        country: fakeNullable(faker.location.country()),
      },
      contact: {
        preferred: preferredContact,
        value: preferredContact === 'Email' ? email : username,
      },
      skills: fakeSkills(),
      showcases: [],
      //
      // matchingSkills: faker.number.int({ min: 1, max: 50 }),
    },
    job: {
      shortUUID: faker.string.sample(6),
      title: faker.person.jobTitle(),
      classification: faker.person.jobType(),
    },
    attestations: {
      upvotes: fakeNullable(faker.number.int({ min: 1, max: 30 })),
      downvotes: fakeNullable(faker.number.int({ min: 1, max: 20 })),
    },
    appliedTimestamp: faker.date.recent().getTime(),
    calendly: fakeNullable(faker.internet.userName()),
    oss: faker.datatype.boolean(),
    interviewed: faker.datatype.boolean(),
    cryptoNative: faker.datatype.boolean(),
    upcomingTalent: faker.datatype.boolean(),
  };
};

export const fakeJobApplicants = (min = 20, max = 100) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeJobApplicant(),
  );

const fakeApplicantHandle = () => {
  const isEmail = faker.datatype.boolean();

  return {
    username: isEmail ? null : faker.internet.userName(),
    email: isEmail ? faker.internet.email().toLowerCase() : null,
  };
};

const fakeSkills = (min = 0, max = 12) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.word.words({ count: { min: 1, max: 2 } }),
    canTeach: faker.datatype.boolean(),
  }));
