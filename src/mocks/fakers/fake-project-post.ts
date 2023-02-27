import { faker } from '@faker-js/faker';

import { KIND_POST_PROJECT } from '~/shared/core/constants';
import type { Project, ProjectPost } from '~/shared/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject, fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeProjectPost = (): ProjectPost => {
  const kind = KIND_POST_PROJECT;
  const details = fakeProject() as Project;
  const org = fakeOrg();
  const jobs = fakeJobs();
  const repos = fakeRepos();
  const competitors = fakeProjects().filter(
    (competitor) => competitor.name !== details.name,
  );
  const created = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

  return {
    kind,
    details,
    org,
    jobs,
    projects: null,
    repos,
    competitors,
    created,
  };
};

export const fakeProjectPosts = (guaranteed = false, min = 4, max = 8) => {
  const posts = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeProjectPost());

  if (!guaranteed) return posts;

  const guaranteedProject = 'Uniswap UNI';

  const projectListings = posts.filter(
    (post) => post.details.name !== guaranteedProject,
  );

  projectListings[0].details.name = guaranteedProject;
  projectListings[0].details.avatar = `/chains/${guaranteedProject}.png`;

  return projectListings;
};
