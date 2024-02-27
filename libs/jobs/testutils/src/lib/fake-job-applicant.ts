import { faker } from '@faker-js/faker';

import { JobApplicant } from '@jobstash/jobs/core';

faker.seed(69_420);

export const fakeJobApplicant = (): JobApplicant => ({
  user: {
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  job: {
    title: faker.person.jobTitle(),
    sub: faker.person.jobType(),
  },
  date: faker.date.recent().getTime(),
  cryptoNative: faker.datatype.boolean(),
  attestations: {
    up: faker.number.int({ min: 1, max: 30 }),
    down: faker.number.int({ min: 1, max: 20 }),
  },
  matchingSkills: faker.number.int({ min: 1, max: 50 }),
  upcomingTalent: faker.datatype.boolean(),
  oss: faker.datatype.boolean(),
});

export const fakeJobApplicants = (min = 6, max = 12) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeJobApplicant(),
  );
