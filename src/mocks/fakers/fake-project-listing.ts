import { faker } from '@faker-js/faker';

import { KIND_LISTING_PROJECT } from '~/core/constants';
import type { Project, ProjectListing } from '~/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject, fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeProjectListing = (): ProjectListing => {
  const kind = KIND_LISTING_PROJECT;
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

export const fakeProjectListings = (guaranteed = false, min = 4, max = 8) => {
  const listings = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeProjectListing());

  if (!guaranteed) return listings;

  const guaranteedProject = 'Uniswap UNI';

  const projectListings = listings.filter(
    (listing) => listing.details.name !== guaranteedProject,
  );

  projectListings[0].details.name = guaranteedProject;
  projectListings[0].details.avatar = `/chains/${guaranteedProject}.png`;

  return projectListings;
};
