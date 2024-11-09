import { AffiliatedOrganization } from '@jobstash/auth/core';

import { ActiveATS } from './active-ats';

interface Props {
  org: AffiliatedOrganization;
}

export const OrgAdminAtsContent = ({ org }: Props) => (
  <div className="flex flex-col gap-16 p-12">
    <ActiveATS />
  </div>
);
