import { slugify } from '~/shared/utils';

import { JobListResult } from '../core/types';

export const createJobKey = ({
  organization: { name: orgName },
  shortUUID,
  jobTitle,
}: JobListResult) => `${slugify(`${orgName} ${jobTitle} `)}${shortUUID}`;
