import { faker } from '@faker-js/faker';

import { ORG_UNISWAP_LABS } from '~/core/constants';
import type { Listing } from '~/core/interfaces';

import { fakeCompetitors } from './fake-competitors';
import { fakeDesc } from './fake-desc';
import { fakeJobs } from './fake-job';
import { fakeOrg, getOrgLocation, OrgName, poolOrgs } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepos } from './fake-repo';
import { fakeTags } from './fake-tag';
import { fakeTechs } from './fake-tech';

export const fakeListing = (): Listing => {
  const org = fakeOrg();
  const jobs = fakeJobs();
  const projects = fakeProject();
  const competitors = fakeCompetitors();
  const repositories = fakeRepos(org);

  return {
    org,
    jobs,
    projects,
    competitors,
    repositories,
  };
};

/** We only list all available orgs (based on those with location) */
export const fakeOrgListings = (): Listing[] => {
  const orgListings: Listing[] = [];

  for (const name of poolOrgs) {
    // We skip Uniswap Labs since we inject it,
    if (name !== ORG_UNISWAP_LABS) {
      const avatar = `/org/${name}.svg`;
      const location = getOrgLocation(name as OrgName);
      const teamSize = faker.datatype.number({ min: 6, max: 16 });
      const dayNum = faker.datatype.number({ min: 1, max: 27 });
      const month = faker.date.month({ abbr: true });
      const year = faker.datatype.number({ min: 2016, max: 2022 });
      const fundingDate = `${dayNum} ${month}, ${year}`;
      const summary = fakeDesc(2, 4);
      const description = fakeDesc(8, 12);
      const tags = fakeTags(6, 8);
      const techs = fakeTechs(3, 6);
      const recent = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

      orgListings.push({
        ...fakeListing(),
        org: {
          name,
          avatar,
          location,
          teamSize,
          fundingDate,
          summary,
          description,
          tags,
          techs,
          recent,
        },
      });
    }
  }

  // Dedupe generated fake org-listings (since it might collide with injected first-element)
  return faker.helpers.uniqueArray(orgListings, poolOrgs.length);
};
