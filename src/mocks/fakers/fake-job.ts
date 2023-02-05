import { faker } from '@faker-js/faker';

import type { Job, Tech } from '~/core/interfaces';

import { fakeDesc } from './fake-desc';
import { poolTechs } from './fake-tech';

const poolRoles: Job['role']['name'][] = [
  'Junior',
  'Mid-Level',
  'Senior',
  'Lead',
];

const poolScopes = ['Backend', 'Frontend', 'dApp', 'Smart Contract'];
const poolSuffix = ['Engineer', 'Developer'];

export const fakeJob = (): Job => {
  const id = faker.datatype.number();
  const role: Job['role'] = {
    name: faker.helpers.arrayElement(poolRoles),
    description: fakeDesc(),
  };
  const scope = faker.helpers.arrayElement(poolScopes);
  const suffix = faker.helpers.arrayElement(poolSuffix);
  const title = `${role.name} ${scope} ${suffix}`;
  const minSalary = faker.datatype.number({ min: 30, max: 60 });
  const maxSalary = faker.datatype.number({ min: 80, max: 100 });
  const salary = `$${minSalary}-${maxSalary}k/year`;
  const location = 'Remote';
  const team: Job['team'] = {
    size: faker.datatype.number({ min: 4, max: 16 }),
    description: fakeDesc(),
  };
  const benefits = fakeDesc();
  const interview = fakeDesc();
  const allTechs: Tech[] = faker.helpers
    .shuffle(poolTechs)
    .map((tech) => ({ name: tech, isChecked: faker.datatype.boolean() }));
  const main = allTechs.slice(0, faker.datatype.number({ min: 1, max: 4 }));
  const hasMentor = allTechs.slice(
    4,
    faker.datatype.number({ min: 4, max: 8 }),
  );
  const shared = allTechs.slice(4, faker.datatype.number({ min: 4, max: 13 }));
  const skills: Job['skills'] = { main, hasMentor, shared };

  return {
    id,
    title,
    role,
    salary,
    location,
    team,
    benefits,
    interview,
    skills,
  };
};

export const fakeJobs = (min = 1, max = 4) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeJob());
