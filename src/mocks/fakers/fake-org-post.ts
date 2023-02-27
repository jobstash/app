import { faker } from '@faker-js/faker';

import { KIND_POST_ORG } from '~/shared/core/constants';
import type { OrgPost } from '~/shared/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeOrgPost = (): OrgPost => {
  const kind = KIND_POST_ORG;
  const details = fakeOrg();
  const jobs = fakeJobs();
  const projects = fakeProjects();
  const repos = fakeRepos();
  const created = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

  return {
    kind,
    details,
    org: null,
    jobs,
    projects,
    repos,
    competitors: null,
    created,
  };
};

export const fakeOrgPosts = (guaranteed = false, min = 4, max = 8) => {
  const posts = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeOrgPost());

  if (!guaranteed) return posts;

  const orgPosts = posts.filter((post) => post.details.name !== 'Uniswap Labs');

  orgPosts[0].details.name = 'Uniswap Labs';
  orgPosts[0].details.avatar = '/orgs/Uniswap Labs.png';
  orgPosts[0].details.website = { text: 'uniswap.org', link: '#' };

  return orgPosts;
};
