import { ProfileVerifiedOrg } from '@jobstash/profile/core';

import { ActiveATS } from './active-ats';

interface Props {
  org: ProfileVerifiedOrg;
}

export const OrgAdminAtsContent = ({ org }: Props) => (
  <div className="flex flex-col gap-16 p-12">
    <ActiveATS />
  </div>
);
