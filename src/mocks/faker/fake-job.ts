import { faker } from '@faker-js/faker';
import { uid } from 'uid';

import { Job, Org } from '~/core/interfaces';

import { fakeDesc } from './fake-desc';
import { getOrgLocation, OrgName } from './fake-org';
import { fakeSkills } from './fake-skill';
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
      desc: fakeDesc(),
    },
    team: {
      desc: fakeDesc(),
      size: faker.datatype.number({ min: 6, max: 16 }),
    },
    benefits: {
      desc: fakeDesc(),
    },
    interview: {
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
