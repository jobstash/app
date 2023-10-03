import { type JobPost } from '@jobstash/jobs/core';
import { numFormatter } from '@jobstash/shared/utils';

import { createJobPageTitle } from './create-job-page-title';

export const createJobCardOgDetails = (jobPost?: JobPost) => {
  if (!jobPost) return { title: '', description: '' };

  const {
    organization,
    jobTitle,
    jobLocation,
    minSalaryRange,
    maxSalaryRange,
    role,
    benefits,
    tags,
    salaryCurrency = 'USD',
  } = jobPost;

  const title = createJobPageTitle(organization.name, jobTitle);
  let description = '';

  if (minSalaryRange && maxSalaryRange) {
    description += `💵 ${salaryCurrency} ${numFormatter.format(
      minSalaryRange,
    )}-${numFormatter.format(maxSalaryRange)}\n\n`;
  }

  if (role || benefits) {
    description += `📝 ${role ?? benefits}\n\n`;
  }

  if (jobLocation) {
    description += `🌎 ${jobLocation}\n\n`;
  }

  if (tags.length > 0) {
    description += `🤓 Skills required: ${tags.map((t) => t.name).join(', ')}`;
  }

  return { title, description };
};
