import { slugify } from '~/shared/utils';

import { JobPost } from '../core/interfaces';

export const createJobKey = ({
  organization: { name: orgName },
  jobpost: { shortUUID, jobTitle },
}: JobPost) => `${slugify(`${orgName} ${jobTitle} `)}${shortUUID}`;
