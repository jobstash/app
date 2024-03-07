import { getLogoUrl } from '~/shared/utils/get-logo-url';
import { InfoTags } from '~/shared/components/info-tags';
import { LogoTitle } from '~/shared/components/logo-title';

import { JobOrg } from '~/jobs/core/schemas';
import { createJobCardOrgInfoTags } from '~/jobs/utils/create-job-card-org-info-tags';

interface Props {
  org: JobOrg;
}

export const JobCardOrg = ({ org }: Props) => {
  const { name, website, logoUrl } = org;
  const src = getLogoUrl(website!, logoUrl);

  const tags = createJobCardOrgInfoTags(org);

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <LogoTitle src={src} name={name} />
      <InfoTags compact tags={tags} />
    </div>
  );
};
