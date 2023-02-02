import { faker } from '@faker-js/faker';

import type { Project } from '~/core/interfaces';

import { fakeProject } from './fake-project';

/** For now, we just create random projects as competitors */
export const fakeCompetitors = (min = 2, max = 4): Project[] => {
  const competitors = [];

  for (let i = 0; i < faker.datatype.number({ min, max }); i++) {
    competitors.push(fakeProject(false)[0]);
  }

  return competitors;
};
