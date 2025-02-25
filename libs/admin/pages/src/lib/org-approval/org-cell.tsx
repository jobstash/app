import { Spinner } from '@heroui/spinner';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useOrgDetails } from '@jobstash/organizations/state';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  orgId: string;
}

export const OrgCell = ({ orgId }: Props) => {
  const { data } = useOrgDetails(orgId);

  if (!data) {
    return (
      <div className="w-full flex justify-center h-12">
        <Spinner color="white" size="sm" />
      </div>
    );
  }

  const { name, website, logoUrl, location } = data;

  return (
    <div className="h-12">
      <LogoTitle
        title={name}
        location={location}
        avatarProps={{
          src: getLogoUrl(website, logoUrl),
          alt: name,
        }}
      />
    </div>
  );
};
