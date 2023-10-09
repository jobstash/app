import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { CardSet, LogoTitle } from '@jobstash/shared/ui';

import { createJobCardOrgTags } from './utils/create-job-card-org-tags';

interface Props {
  org: JobPost['organization'];
}

const JobCardOrg = ({ org }: Props) => {
  const sortedFundingRounds = org.fundingRounds.sort((a, b) => a.date - b.date);
  const tags = createJobCardOrgTags(sortedFundingRounds, org.headcountEstimate);

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="items-center gap-x-8 lg:flex">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: getLogoUrl(org.website, org.logoUrl),
            alt: org.name,
          }}
        />
        <div className="flex grow flex-wrap pt-2 gap-2 lg:pt-0 [&>*]:mr-4">
          {tags.length > 0 &&
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
