import { faker } from '@faker-js/faker';

import { ProfileSkill } from '@jobstash/profile/core';

export const fakeSkills = (min = 0, max = 12): ProfileSkill[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.word.words({ count: { min: 1, max: 2 } }),
    canTeach: faker.datatype.boolean(),
  }));
