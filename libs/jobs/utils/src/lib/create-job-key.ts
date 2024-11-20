import { JobPost } from '@jobstash/shared/core';
import { slugify } from '@jobstash/shared/utils';

export const createJobKey = ({
  shortUUID,
  title,
  organization,
  project,
}: JobPost) =>
  `${slugify(
    `${organization?.name ?? project?.name ?? ''} ${title} `,
  )}${shortUUID}`;
