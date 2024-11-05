import { OrgInfoForm } from '@jobstash/admin/ui';

import { OrgAdminEditOrgHeader } from './header';

interface Props {
  orgId: string;
}

export const OrgAdminEditOrgContent = ({ orgId }: Props) => {
  console.log('TODO');
  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-[88px]">
        <OrgAdminEditOrgHeader orgId={orgId} />
      </div>
      <OrgInfoForm disabledLabels={['Name', 'Website']} orgId={orgId} />
    </div>
  );
};
