import { type JobPost } from '@jobstash/jobs/core';
import { slugify } from '@jobstash/shared/utils';

export const createJobKey = ({
  shortUUID,
  jobTitle,
  organization: { name: orgName },
}: JobPost) => `${slugify(`${orgName} ${jobTitle} `)}${shortUUID}`;
