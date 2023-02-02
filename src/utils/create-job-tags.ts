import type { Job, Tag } from '~/core/interfaces';

import { formatSalary } from './format-salary';

export const createJobTags = (job: Job): Tag[] => [
  { text: job.details.role.name, iconKey: 'senior' },
  { text: formatSalary(job.salary), iconKey: 'salary' },
  { text: job.location, iconKey: 'location' },
  { text: `Team size: ${job.details.team.size}`, iconKey: 'teamSize' },
  { text: job.tz, iconKey: 'utc' },
];
