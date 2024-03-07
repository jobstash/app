import { faker } from '@faker-js/faker';

import { JobInfoTags } from '~/shared/core/schemas';
import { mergeObjects } from '~/shared/utils/merge-objects';

import { JOB_SENIORITY_MAP } from '~/jobs/core/constants';

import { fakeLocation } from './fake-location';

export const fakeJobInfoTags = (override?: Partial<JobInfoTags>) => {
  const seniority = fakeSeniority();

  const salary = faker.number.int({ min: 5000, max: 200000 });
  const { minimumSalary, maximumSalary } = fakeSalaryRange();
  const salaryCurrency = faker.finance.currencyCode();

  const location = fakeLocation();
  const locationType = fakeLocationType();

  const commitment = fakeCommitment();
  const paysInCrypto = faker.datatype.boolean();
  const offersTokenAllocation = faker.datatype.boolean();
  const classification = faker.commerce.department();

  const result: JobInfoTags = {
    seniority,
    salary,
    minimumSalary,
    maximumSalary,
    salaryCurrency,
    location,
    locationType,
    commitment,
    paysInCrypto,
    offersTokenAllocation,
    classification,
  };

  if (override) return mergeObjects(result, override);

  return result;
};

const seniorityValues = Object.values(JOB_SENIORITY_MAP);
const fakeSeniority = () => faker.helpers.arrayElement(seniorityValues);

const fakeSalaryRange = () => {
  const min = faker.number.int({ min: 2000, max: 100000 });
  const max = faker.number.int({ min, max: min + 5000 });

  return {
    minimumSalary: min,
    maximumSalary: max,
  };
};

const locationTypeOptions = ['ONSITE', 'REMOTE'];
const fakeLocationType = () => faker.helpers.arrayElement(locationTypeOptions);

const commitmentOptions = ['PART_TIME', 'FULL_TIME', 'INTERNSHIP', 'CONTRACT'];
const fakeCommitment = () => faker.helpers.arrayElement(commitmentOptions);
