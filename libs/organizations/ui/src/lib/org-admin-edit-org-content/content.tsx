import { ProfileVerifiedOrg } from '@jobstash/profile/core';

import { OrgInfoForm } from '@jobstash/admin/ui';

import { OrgAdminEditOrgHeader } from './header';

interface Props {
  org: ProfileVerifiedOrg;
}

export const OrgAdminEditOrgContent = ({ org }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="min-h-[88px]">
      <OrgAdminEditOrgHeader orgId={org.id} />
    </div>
    <OrgInfoForm disabledLabels={['Name', 'Website']} orgId={org.id} />
  </div>
);
