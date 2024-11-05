import { getLogoUrl } from '@jobstash/shared/utils';

import { useManagedOrg } from '@jobstash/admin/state';

import { DeleteOrgModal } from '@jobstash/admin/ui';
import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  orgId: string;
}

export const OrgAdminEditOrgHeader = ({ orgId }: Props) => {
  const { data } = useManagedOrg(orgId);

  if (!data) return null;

  const { name, location, websites, logoUrl } = data;

  return (
    <div className="flex flex-col md:items-center md:flex-row gap-8 py-4">
      <LogoTitle
        size="lg"
        title={name}
        location={location}
        avatarProps={{
          alt: name ?? '',
          src: getLogoUrl(websites.length > 0 ? websites[0] : '', logoUrl),
        }}
      />

      <DeleteOrgModal id={orgId} isDisabled={!data} />
    </div>
  );
};
