import { faker } from '@faker-js/faker';
import {
  fakeNullable,
  fakeRepositoryInfo,
  fakeTag,
} from '@jobstash/shared/testutils';

import {
  ProfileRepo,
  ProfileRepoListQueryPage,
  ProfileRepoTag,
} from '@jobstash/profile/core';

export const fakeProfileRepoTag = (): ProfileRepoTag => ({
  ...fakeTag(),
  canTeach: faker.datatype.boolean(),
});

export const fakeProfileRepoTagList = (): ProfileRepoTag[] =>
  Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() =>
    fakeProfileRepoTag(),
  );

export const fakeProfileRepo = (): ProfileRepo => ({
  ...fakeRepositoryInfo(),
  org: {
    name: faker.company.name(),
    logo: faker.image.url(),
    url: faker.internet.url(),
  },
  tags: fakeProfileRepoTagList(),
  contribution: {
    summary: fakeNullable(faker.lorem.sentences({ min: 2, max: 4 })),
    count: faker.number.int({ min: 1, max: 100 }),
  },
});

export const fakeProfileRepoList = (min = 3, max = 8): ProfileRepo[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeProfileRepo(),
  );

export const fakeProfileRepoListQueryPage = (): ProfileRepoListQueryPage => {
  const data = fakeProfileRepoList();

  return {
    page: 1,
    count: data.length,
    total: data.length,
    data,
  };
};
