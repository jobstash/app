import { faker } from '@faker-js/faker';

import { KIND_LISTING_REPO } from '~/core/constants';
import type { Project, RepoListing } from '~/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepo } from './fake-repo';

export const fakeRepoListing = (): RepoListing => {
  const kind = KIND_LISTING_REPO;
  const org = fakeOrg();
  const details = fakeRepo();
  const projects = [fakeProject() as Project];
  const jobs = fakeJobs();
  const created = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

  return {
    kind,
    details,
    org,
    jobs,
    projects,
    repos: null,
    competitors: null,
    created,
  };
};

export const fakeRepoListings = (guaranteed = false, min = 4, max = 8) => {
  const listings = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeRepoListing());

  if (!guaranteed) return listings;

  const guaranteedRepo = 'uniswap/interface';

  const repoListings = listings.filter(
    (listing) => listing.details.name !== guaranteedRepo,
  );

  repoListings[0].details.name = guaranteedRepo;
  repoListings[0].org.name = 'Uniswap Labs';
  repoListings[0].org.avatar = '/orgs/Uniswap Labs.png';
  repoListings[0].org.website = { text: 'uniswap.org', link: '#' };

  return repoListings;
};
