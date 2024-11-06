import { JobPost } from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

export const createJobKey = ({
  shortUUID,
  title,
  organization: { name: orgName },
}: JobPost) => `${slugify(`${orgName} ${title} `)}${shortUUID}`;
