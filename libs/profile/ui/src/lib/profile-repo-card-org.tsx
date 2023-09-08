import { memo } from 'react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  name: string;
  logo: string | null;
  url: string;
}

const ProfileRepoCardOrg = (props: Props) => {
  const { name, logo, url } = props;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="items-center gap-x-8 lg:flex">
        <LogoTitle
          title={name}
          avatarProps={{
            src: getLogoUrl(url, logo),
            alt: name,
          }}
        />
      </div>
    </>
  );
};

export default memo(ProfileRepoCardOrg);
