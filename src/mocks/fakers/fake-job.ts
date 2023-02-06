import { faker } from '@faker-js/faker';

import type { Job } from '~/core/interfaces';

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
  const role = {
    name: faker.helpers.arrayElement(poolRoles),
    description: fakeDesc(),
  };
  const scope = faker.helpers.arrayElement(poolScopes);
  const suffix = faker.helpers.arrayElement(poolSuffix);
  const title = `${role.name} ${scope} ${suffix}`;
  const minSalary =
    Math.round(faker.datatype.number({ min: 60, max: 80 }) / 10) * 10;
  const maxSalary =
    Math.round(faker.datatype.number({ min: 90, max: 120 }) / 10) * 10;
  const salary = `$${minSalary}-${maxSalary}k/year`;
  const location = 'Remote';
  const team = {
    size: faker.datatype.number({ min: 4, max: 16 }),
    description: fakeDesc(),
  };
  const benefits = fakeDesc();
  const interview = fakeDesc();
  const allTechs = faker.helpers
    .shuffle(poolTechs)
    .map((tech) => ({ name: tech, isChecked: faker.datatype.boolean() }));
  const main = allTechs.slice(0, faker.datatype.number({ min: 1, max: 2 }));
  const hasMentor = allTechs.slice(
    3,
    faker.datatype.number({ min: 4, max: 5 }),
  );
  const shared = allTechs.slice(6, faker.datatype.number({ min: 7, max: 8 }));
  const skills = { main, hasMentor, shared };

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
