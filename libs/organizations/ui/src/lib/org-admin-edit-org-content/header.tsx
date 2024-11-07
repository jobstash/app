import { getLogoUrl } from '@jobstash/shared/utils';

import { useOrgDetails } from '@jobstash/organizations/state';

import { DeleteOrgModal } from '@jobstash/admin/ui';
import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  orgId: string;
}

export const OrgAdminEditOrgHeader = ({ orgId }: Props) => {
  const { data } = useOrgDetails(orgId);

  if (!data) return null;

  const { name, location, website, logoUrl } = data;

  return (
    <div className="flex flex-col md:items-center md:flex-row gap-8 py-4">
      <LogoTitle
        size="lg"
        title={name}
        location={location}
        avatarProps={{
          alt: name ?? '',
          src: getLogoUrl(website, logoUrl),
        }}
      />

      <DeleteOrgModal id={orgId} isDisabled={!data} />
    </div>
  );
};
