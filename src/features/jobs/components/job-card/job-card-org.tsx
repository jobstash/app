import { memo, useMemo } from 'react';

import { createJobCardOrgTags } from '~/features/jobs/utils';
import { CardSet, LogoTitle } from '~/shared/components';
import { FundingRound, Organization } from '~/shared/core/interfaces';

interface Props {
  org: Organization;
  fundingRounds: FundingRound[];
}

const JobCardOrg = ({ org, fundingRounds }: Props) => {
  const orgTags = useMemo(
    () => createJobCardOrgTags(fundingRounds),
    [fundingRounds],
  );

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="items-center gap-x-8 lg:flex">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: `https://www.google.com/s2/favicons?domain=${org.url}&sz=128`,
            alt: org.name,
          }}
        />
        <div className="flex grow flex-wrap pt-2 lg:gap-x-8 lg:pt-0 [&>*]:mr-4">
          {orgTags &&
            orgTags.map(({ text, icon, link }) => (
              <CardSet key={text} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
        </div>
      </div>
    </>
  );
};

export default memo(JobCardOrg);
