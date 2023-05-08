import { seniorityMapping } from '~/features/filters/core/constants';
import {
  LevelIcon,
  LocationIcon,
  MoneyIcon,
  SuitcaseIcon,
} from '~/shared/components';
import { JobPost, TagElement } from '~/shared/core/interfaces';
import { capitalize, numFormatter } from '~/shared/utils';

const senioritySet = new Set(Object.keys(seniorityMapping));

export const createJobTags = (job: JobPost): TagElement[] => {
  const {
    seniority,
    minSalaryRange,
    maxSalaryRange,
    jobLocation,
    jobCommitment,
  } = job;

  const tags: TagElement[] = [];

  // **Note**: remove "Seniority" text when actual label e.g. "Junior" is implemented in backend
  if (seniority && seniority !== 'undefined') {
    let label = '';

    for (const [k, v] of Object.entries(seniorityMapping)) {
      if (v === seniority) {
        label = k;
      }
    }

    if (senioritySet.has(label)) {
      tags.push({
        text: label.length > 0 ? label : seniority,
        icon: <LevelIcon />,
      });
    }
  }

  // **Note**: waiting to finalize salary
  if (minSalaryRange && maxSalaryRange) {
    const salary = `$${numFormatter.format(
      minSalaryRange,
    )} - $${numFormatter.format(maxSalaryRange)}`;
    tags.push({ text: `Salary: ${salary}`, icon: <MoneyIcon /> });
  }

  if (jobLocation && jobLocation !== 'unspecified')
    tags.push({ text: capitalize(jobLocation), icon: <LocationIcon /> });
  if (jobCommitment) tags.push({ text: jobCommitment, icon: <SuitcaseIcon /> });

  return [...tags];
};
