import { faker } from '@faker-js/faker';

import { Project } from '~/core/interfaces';

import { fakeProject } from './fake-project';

/** For now, we just create random projects as competitors */
export const fakeCompetitors = (min = 2, max = 4): Project[] => {
  const projects = Array.from({
    length: faker.datatype.number({ min, max }),
  })
    .fill(0)
    .map(() => fakeProject(false));

  return projects as Project[];
};
