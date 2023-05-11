import { slugify } from '~/shared/utils';

import { Job } from '../core/types';

export const createJobKey = ({
  organization: { name: orgName },
  jobpost: { shortUUID, jobTitle },
}: Job) => `${slugify(`${orgName} ${jobTitle} `)}${shortUUID}`;
