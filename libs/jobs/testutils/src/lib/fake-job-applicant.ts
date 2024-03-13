import { faker } from '@faker-js/faker';
import { fakeNullable } from '@jobstash/shared/testutils';

faker.seed(69_420);

export const fakeJobApplicant = () => {
  const { username, email } = fakeApplicantHandle();

  return {
    user: {
      avatar: faker.image.avatar(),
      username,
      email,
      availableForWork: faker.datatype.boolean(),
      location: {
        city: fakeNullable(faker.location.city()),
        country: fakeNullable(faker.location.country()),
      },
      matchingSkills: faker.number.int({ min: 1, max: 50 }),
      skills: [],
      showcases: [],
    },
    job: {
      shortUUID: faker.string.sample(6),
      title: faker.person.jobTitle(),
      classification: faker.person.jobType(),
    },
    attestations: {
      upvotes: faker.number.int({ min: 1, max: 30 }),
      downvotes: faker.number.int({ min: 1, max: 20 }),
    },
    appliedTimestamp: faker.date.recent().getTime(),
    calendly: fakeNullable(faker.internet.userName()),
    oss: faker.datatype.boolean(),
    interviewed: faker.datatype.boolean(),
    date: faker.date.recent().getTime(),
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
