import { faker } from '@faker-js/faker';

import { capitalize } from '@jobstash/shared/utils';

export const fakeWorkHistory = (min = 1, max = 6) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeWorkHistoryOrg(),
  );

const fakeWorkHistoryRepo = () => {
  const name = faker.git.branch();
  const firstContributedAt = faker.date
    .past({
      years: faker.number.int({ min: 1, max: 8 }),
    })
    .getTime();
  const lastContributedAt = faker.date.recent().getTime();
  const commitsCount = faker.number.int({ max: 200 });

  return {
    name,
    firstContributedAt,
    lastContributedAt,
    commitsCount,
  };
};

const fakeWorkHistoryRepos = (min = 1, max = 6) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeWorkHistoryRepo(),
  );

const fakeWorkHistoryOrg = () => {
  const login = faker.internet.domainName();
  const name = capitalize(faker.company.catchPhraseNoun());
  const firstContributedAt = faker.date
    .past({
      years: faker.number.int({ min: 1, max: 8 }),
    })
    .getTime();
  const lastContributedAt = faker.date.recent().getTime();
  const repositories = fakeWorkHistoryRepos();

  return {
    login,
    name,
    firstContributedAt,
    lastContributedAt,
    repositories,
  };
};
