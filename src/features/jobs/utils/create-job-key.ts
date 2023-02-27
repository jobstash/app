import { slugify } from '~/shared/utils';

import { JobPost } from '../core/interfaces';

export const createJobKey = ({
  organization: { name: orgName },
  jobpost: { id, jobTitle },
}: JobPost) => slugify(`${orgName} ${jobTitle} ${id}`);
