import {
  LevelIcon,
  LocationIcon,
  MoneyIcon,
  SuitcaseIcon,
} from '~/shared/components';
import { Job, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createJobTags = (job: Job): TagElement[] => {
  const {
    seniority,
    minSalaryRange,
    maxSalaryRange,
    jobLocation,
    jobCommitment,
  } = job;

  const tags: TagElement[] = [];

  // **Note**: remove "Seniority" text when actual label e.g. "Junior" is implemented in backend
  if (seniority && seniority !== 'undefined')
    tags.push({ text: `Seniority: ${seniority}`, icon: <LevelIcon /> });

  // **Note**: waiting to finalize salary
  if (minSalaryRange && maxSalaryRange) {
    const salary = `$${numFormatter.format(
      minSalaryRange,
    )} - $${numFormatter.format(maxSalaryRange)}`;
    tags.push({ text: `Salary: ${salary}`, icon: <MoneyIcon /> });
  }

  if (jobLocation && jobLocation !== 'unspecified')
    tags.push({ text: jobLocation, icon: <LocationIcon /> });
  if (jobCommitment) tags.push({ text: jobCommitment, icon: <SuitcaseIcon /> });

  return [...tags];
};
