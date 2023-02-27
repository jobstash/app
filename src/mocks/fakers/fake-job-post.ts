import { faker } from '@faker-js/faker';

import { KIND_POST_JOB } from '~/shared/core/constants';
import type { JobPost } from '~/shared/core/interfaces';

import { fakeJob } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject, fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeJobPost = (): JobPost => {
  const kind = KIND_POST_JOB;
  const details = fakeJob();
  const org = fakeOrg();
  const project = fakeProject(true);
  const projects = project ? [project] : [];
  const repos = fakeRepos();
  const competitors = fakeProjects().filter(
    (competitor) => competitor.name !== projects[0]?.name,
  );
  const created = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

  return {
    kind,
    details,
    org,
    jobs: null,
    projects,
    repos,
    competitors,
    created,
  };
};

export const fakeJobPosts = (guaranteed = false, min = 3, max = 6) => {
  const posts = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeJobPost());

  if (!guaranteed) return posts;

  const jobListings = posts.filter((post) => post.org.name !== 'Uniswap Labs');

  jobListings[0].org.name = 'Uniswap Labs';
  jobListings[0].org.avatar = '/orgs/Uniswap Labs.png';
  jobListings[0].org.website = { text: 'uniswap.org', link: '#' };
  jobListings[0].org.location = `NYC, USA`;
  jobListings[0].details.id = 12_345;
  jobListings[0].details.role.name = 'Senior';
  jobListings[0].details.title = 'Senior Frontend Engineer';

  return jobListings;
};
