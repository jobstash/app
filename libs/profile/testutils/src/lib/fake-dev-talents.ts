import { faker } from '@faker-js/faker';

import { DevTalent } from '@jobstash/profile/core';

import { fakeProfileInfo } from './fake-profile-info';
import { fakeShowcases } from './fake-showcases';
import { fakeSkills } from './fake-skills';

export const fakeDevTalent = (): DevTalent => ({
  ...fakeProfileInfo(),
  skills: fakeSkills(0, 6),
  showcases: fakeShowcases(0, 3),
});

export const fakeDevTalents = (min = 0, max = 12) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeDevTalent(),
  );
