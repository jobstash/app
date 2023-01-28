import { Project } from '~/core/interfaces';

import { fakeArrayFromFaker } from './fake-array-from-faker';
import { fakeProject } from './fake-project';

/** For now, we just create random projects as competitors */
export const fakeCompetitors = (min = 2, max = 4): Project[] =>
  fakeArrayFromFaker(() => fakeProject(false), min, max);
