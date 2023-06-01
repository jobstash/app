import { type JobPost } from '@jobstash/jobs/core';
import { numFormatter } from '@jobstash/shared/utils';

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
    technologies,
    salaryCurrency = 'USD',
  } = jobPost;

  const title = `${organization.name} | ${jobTitle}\n\n`;
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

  if (technologies.length > 0) {
    description += `🤓 Skills required: ${technologies
      .map((t) => t.name)
      .join(', ')}`;
  }

  return { title, description };
};