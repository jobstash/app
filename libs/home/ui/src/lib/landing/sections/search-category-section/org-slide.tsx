import { Spinner } from '@heroui/spinner';

import { OrgListItem } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useHomePageOrgs } from '@jobstash/home/state';

import { LogoTitle } from '@jobstash/shared/ui';

export const OrgSlide = () => {
  const { data } = useHomePageOrgs();

  if (!data) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <Spinner color="white" />
      </div>
    );
  }

  const orgs = data.data
    .filter((org) => org.jobCount > 0)
    .sort((a, b) => b.lastFundingAmount - a.lastFundingAmount);

  return (
    <div>
      <div className="overflow-hidden whitespace-nowrap relative mt-8">
        <div
          style={{
            display: 'inline-block',
            animation: `${orgs.length * 6}s slides infinite linear`,
          }}
        >
          {orgs.map((org) => (
            <OrgItem key={org.orgId} org={org} />
          ))}
        </div>
      </div>
    </div>
  );
};

const OrgItem = ({ org }: { org: OrgListItem }) => {
  const { name, logoUrl, url } = org;

  return (
    <div className="inline-flex items-center mr-14">
      <LogoTitle
        title={name}
        avatarProps={{ src: getLogoUrl(url, logoUrl), alt: name }}
      />
    </div>
  );
};
