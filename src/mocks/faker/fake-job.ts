import { faker } from '@faker-js/faker';
import { uid } from 'uid';

import {
  LABEL_BENEFITS,
  LABEL_INTERVIEW,
  LABEL_ROLE,
  LABEL_TEAM,
} from '~/core/constants';
import type { Job, Org } from '~/core/interfaces';

import { fakeArrayFromFaker } from './fake-array-from-faker';
import { fakeDesc } from './fake-desc';
import { fakeOrg, getOrgLocation, OrgName } from './fake-org';
import { fakeSkills } from './fake-skills';
import { fakeTz } from './fake-tz';

const poolRoles = ['Junior', 'Senior', 'Lead'];
const poolScopes = ['Backend', 'Frontend', 'dApp', 'Smart Contract'];
const poolSuffix = ['Engineer', 'Developer'];

// Util formatting strings as segments
const segmentFrom = (str: string) => str.toLowerCase().replaceAll(' ', '-');

interface FakeJobOptions {
  role?: string;
  scope?: string;
  suffix?: string;
  hash?: string;
}

export const fakeJob = (org: Org, options?: FakeJobOptions): Job => {
  const roleStr = options?.role ?? faker.helpers.arrayElement(poolRoles);
  const scopeStr = options?.scope ?? faker.helpers.arrayElement(poolScopes);
  const suffixStr = options?.suffix ?? faker.helpers.arrayElement(poolSuffix);
  const title = `${roleStr} ${scopeStr} ${suffixStr}`;

  const segmentOrg = segmentFrom(org.name);
  const segmentJobTitle = segmentFrom(title);
  const segmentHash = options?.hash ?? uid(5);

  // * Note: received from db. Assumed to be in the form `{org}--{job-title}-{hash}`
  const id = `${segmentOrg}-${segmentJobTitle}-${segmentHash}`;

  const salary = {
    min: faker.datatype.number({ min: 60_000, max: 80_000 }),
    max: faker.datatype.number({ min: 85_000, max: 140_000 }),
  };

  const location =
    faker.helpers.maybe(() => getOrgLocation(org.name as OrgName)) ?? 'Remote';

  const tz = fakeTz();

  const created = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

  const details = {
    role: {
      name: roleStr,
      label: LABEL_ROLE,
      desc: fakeDesc(),
    },
    team: {
      label: LABEL_TEAM,
      desc: fakeDesc(),
      size: faker.datatype.number({ min: 6, max: 16 }),
    },
    benefits: {
      label: LABEL_BENEFITS,
      desc: fakeDesc(),
    },
    interview: {
      label: LABEL_INTERVIEW,
      desc: fakeDesc(),
    },
  };

  const skills = fakeSkills();

  return {
    id,
    title,
    salary,
    location,
    tz,
    created,
    details,
    skills,
  };
};

export const fakeJobs = (min = 6, max = 12): Job[] =>
  fakeArrayFromFaker(() => fakeJob(fakeOrg()), min, max);
