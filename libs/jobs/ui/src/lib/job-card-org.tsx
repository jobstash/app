import { memo } from 'react';

import { type Organization } from '@jobstash/organizations/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { CardSet, LogoTitle } from '@jobstash/shared/ui';

import { createJobCardOrgTags } from './utils/create-job-card-org-tags';

interface Props {
  org: Organization;
}

const JobCardOrg = ({ org }: Props) => {
  const tags = createJobCardOrgTags(org.fundingRounds, org.headCount);

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="items-center gap-x-8 lg:flex">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: getGoogleLogoUrl(org.url),
            alt: org.name,
          }}
        />
        <div className="flex grow flex-wrap pt-2 lg:gap-x-2 lg:pt-0 [&>*]:mr-4">
          {tags &&
            tags.map(({ id, text, icon, link }) => (
              <CardSet key={id} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
        </div>
      </div>
    </>
  );
};

export default memo(JobCardOrg);
