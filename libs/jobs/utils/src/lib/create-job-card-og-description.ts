import { JobPost } from '@jobstash/shared/core';
import { numFormatter } from '@jobstash/shared/utils';

import { createJobPageTitle } from './create-job-page-title';

export const createJobCardOgDetails = (jobPost?: JobPost) => {
  if (!jobPost) return { title: '', description: '' };

  const {
    organization,
    title: jobTitle,
    location,
    minimumSalary,
    maximumSalary,
    summary,
    tags,
    salaryCurrency = 'USD',
  } = jobPost;

  const title = createJobPageTitle(organization.name, jobTitle);
  let description = '';

  if (minimumSalary && maximumSalary) {
    description += `💵 ${salaryCurrency} ${numFormatter.format(
      minimumSalary,
    )}-${numFormatter.format(maximumSalary)}\n\n`;
  }

  if (summary) {
    description += `📝 ${summary}\n\n`;
  }

  if (location) {
    description += `🌎 ${location}\n\n`;
  }

  if (tags.length > 0) {
    description += `🤓 Skills required: ${tags.map((t) => t.name).join(', ')}`;
  }

  return { title, description };
};
