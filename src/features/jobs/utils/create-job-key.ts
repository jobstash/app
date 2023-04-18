import { slugify } from '~/shared/utils';

import { Job } from '../core/interfaces';

export const createJobKey = ({
  organization: { name: orgName },
  jobpost: { shortUUID, jobTitle },
}: Job) => `${slugify(`${orgName} ${jobTitle} `)}${shortUUID}`;
