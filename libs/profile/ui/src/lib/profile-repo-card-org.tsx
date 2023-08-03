import { memo } from 'react';

import { getGoogleLogoUrl } from '@jobstash/shared/utils';

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
            src: logo ?? getGoogleLogoUrl(url),
            alt: name,
          }}
        />
      </div>
    </>
  );
};

export default memo(ProfileRepoCardOrg);
