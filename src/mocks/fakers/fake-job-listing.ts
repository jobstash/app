import { faker } from '@faker-js/faker';

import type { JobListing } from '~/core/interfaces';

import { fakeJob } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject, fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeJobListing = (): JobListing => {
  const details = fakeJob();
  const org = fakeOrg();
  const project = fakeProject();
  const repos = fakeRepos();
  const competitors = fakeProjects().filter(
    (competitor) => competitor.name !== project.name,
  );
  const created = `${faker.datatype.number({ min: 1, max: 6 })} days ago`;

  return { details, org, project, repos, competitors, created };
};

export const fakeJobListings = (guaranteed = false, min = 4, max = 8) => {
  const listings = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeJobListing());

  if (!guaranteed) return listings;

  const jobListings = listings.filter(
    (listing) => listing.org.name !== 'Uniswap Labs',
  );

  jobListings[0].org.name = 'Uniswap Labs';
  jobListings[0].org.avatar = `/orgs/Uniswap Labs.png`;
  jobListings[0].details.id = 12_345;
  jobListings[0].details.role.name = 'Senior';
  jobListings[0].details.title = 'Senior Frontend Engineer 12345';

  return jobListings;
};
