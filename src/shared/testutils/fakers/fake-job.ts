import { faker } from '@faker-js/faker';

import { JobPost } from '~/shared/core/interfaces';

import { fakeDesc } from './fake-desc';

export const fakeJob = (): JobPost => {
  const id = faker.datatype.uuid();

  const seniority = faker.helpers.arrayElement([
    'Staff',
    'Lead',
    'Senior',
    'Mid Level',
    'Junior',
    'Intern',
  ]);

  const jobTitle = `FAKE ${seniority} ${faker.helpers.arrayElement([
    'Backend',
    'Frontend',
    'dApp',
    'Cloud',
  ])} Engineer`;

  const jobCreatedTimestamp = faker.date.recent(60).valueOf();
  const jobFoundTimestamp = faker.date.recent(60).valueOf();
  const extractedTimestamp = faker.date.recent(60).valueOf();

  const minSalaryRange = faker.datatype.number({ min: 60_000, max: 80_000 });
  const maxSalaryRange = faker.datatype.number({ min: 90_000, max: 120_000 });

  const jobLocation = faker.helpers.arrayElement(['Remote', 'NYC, USA']);
  const jobCommitment = faker.helpers.arrayElement(['Full Time', 'Part Time']);

  const jobApplyPageUrl = faker.internet.url();
  const jobPageUrl = faker.internet.url();

  const role = fakeDesc();
  const team = fakeDesc();
  const benefits = fakeDesc();
  const culture = fakeDesc();

  const shortUUID = faker.datatype.string(6);

  return {
    id,
    shortUUID,
    jobTitle,
    jobCreatedTimestamp,
    jobFoundTimestamp,
    extractedTimestamp,
    minSalaryRange,
    maxSalaryRange,
    jobLocation,
    jobCommitment,
    jobApplyPageUrl,
    jobPageUrl,
    role,
    team,
    benefits,
    culture,
  };
};
