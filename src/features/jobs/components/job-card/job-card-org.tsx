import { memo, useMemo } from 'react';

import { createJobCardOrgTags } from '~/features/jobs/utils';
import { CardSet, LogoTitle } from '~/shared/components';
import { Organization } from '~/shared/core/interfaces';

interface Props {
  org: Organization;
}

const JobCardOrg = ({ org }: Props) => {
  const orgTags = useMemo(() => createJobCardOrgTags(org), [org]);

  return (
    <>
      <div className="flex h-4 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <div className="items-center gap-x-8 lg:flex">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: `https://www.google.com/s2/favicons?domain=${org.url}&sz=128`,
            alt: org.name,
          }}
        />
        <div className="grow pt-4 lg:flex lg:flex-wrap lg:gap-x-8 lg:pt-0">
          {orgTags.length > 0 &&
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
