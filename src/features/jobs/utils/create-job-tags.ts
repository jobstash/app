import { Job, TagElement } from '~/shared/core/interfaces';
import { numFormatter } from '~/shared/utils';

export const createJobTags = (job: Job): TagElement[] => {
  const { seniority, minSalary, maxSalary, jobLocation, jobCommitment } = job;

  const tags: TagElement[] = [];

  // **Note**: remove "Seniority" text when actual label e.g. "Junior" is implemented in backend
  if (seniority)
    tags.push({ text: `Seniority: ${seniority}`, iconText: 'level' });

  const salary = `$${numFormatter.format(minSalary)}-$${numFormatter.format(
    maxSalary,
  )}`;

  return [
    ...tags,
    { text: `Salary: ${salary}`, iconText: 'money' },
    { text: jobLocation, iconText: 'location' },
    // **NOTE**: add svg icon for job-commitment then replace iconText
    { text: jobCommitment, iconText: 'baggage-2' },
    // **NOTE**: still waiting for employee_count data from mw
  ];
};
