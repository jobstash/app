import { memo } from 'react';

import { JobPost } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { CardSet, LogoTitle, OrgCommunityTag } from '@jobstash/shared/ui';

import { createJobCardOrgTags } from './utils/create-job-card-org-tags';

interface Props {
  org: JobPost['organization'];
}

const JobCardOrg = ({ org }: Props) => {
  const { name, website, logoUrl, community } = org;

  const tags = createJobCardOrgTags(org);

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-4">
        <div className="items-center gap-x-8 lg:flex">
          <LogoTitle
            title={name}
            avatarProps={{
              src: getLogoUrl(website, logoUrl),
              alt: name,
            }}
          />
          <div className="flex grow flex-wrap pt-2 gap-2 lg:pt-0 [&>*]:mr-4">
            {tags.length > 0 &&
              tags.map(({ id, text, icon, link }) => (
                <CardSet key={id} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            <OrgCommunityTag community={community} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(JobCardOrg);
