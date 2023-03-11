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
    tags.push({ text: `Seniority: ${seniority}`, iconText: 'level' });

  // **Note**: waiting to finalize salary
  if (minSalaryRange && maxSalaryRange) {
    const salary = `$${numFormatter.format(
      minSalaryRange,
    )}-$${numFormatter.format(maxSalaryRange)}`;
    tags.push({ text: `Salary: ${salary}`, iconText: 'money' });
  }

  if (jobLocation && jobLocation !== 'unspecified')
    tags.push({ text: jobLocation, iconText: 'location' });
  if (jobCommitment) tags.push({ text: jobCommitment, iconText: 'baggage-2' });

  return [...tags];
};
