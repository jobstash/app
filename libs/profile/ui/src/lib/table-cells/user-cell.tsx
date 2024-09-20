import { DevTalent } from '@jobstash/profile/core';
import { getNameFromTalent } from '@jobstash/profile/utils';
import { formatWalletAddress, getAvatarSrc } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

import { EmptyCellPlaceholder } from '../empty-cell-placeholder';

interface Location {
  city: string | null;
  country: string | null;
}

interface Props {
  data: DevTalent;
}

const getLocationText = (location: Location) => {
  const { city, country } = location;

  return !city && !country
    ? undefined
    : `${city ? `${city}` : ''}${city && country ? ', ' : ' '}${country ?? ''}`;
};

export const UserCell = ({ data }: Props) => {
  const { location, githubAvatar, name, alternateEmails, linkedAccounts } =
    data;

  const title = getNameFromTalent({ name, alternateEmails, linkedAccounts });

  const locationText = getLocationText(location);

  const avatar = githubAvatar ?? getAvatarSrc(title);

  if (!title) return <EmptyCellPlaceholder />;

  return (
    <LogoTitle
      key={title}
      identiconFallback
      title={title}
      location={locationText}
      avatarProps={{
        src: avatar,
        alt: title,
        name: title,
      }}
    />
  );
};
