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

      <div className="flex h-8 items-center gap-x-8">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: `https://www.google.com/s2/favicons?domain=${org.url}&sz=128`,
            alt: org.name,
          }}
        />
        {orgTags.length > 0 &&
          orgTags.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
      </div>
    </>
  );
};

export default memo(JobCardOrg);
