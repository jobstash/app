import { LinkedAccounts } from '@jobstash/shared/core';
import { getNameFromTalent } from '@jobstash/profile/utils';
import { getAvatarSrc } from '@jobstash/shared/utils';

import LogoTitle from '../../base/logo-title';

import { EmptyCellPlaceholder } from './empty-cell-placeholder';

interface Location {
  city: string | null;
  country: string | null;
}

interface Props {
  user: {
    location: Location;
    githubAvatar: string | null;
    name: string | null;
    alternateEmails: string[];
    linkedAccounts: LinkedAccounts;
  };
}

const getLocationText = (location: Location) => {
  const { city, country } = location;

  return !city && !country
    ? undefined
    : `${city ? `${city}` : ''}${city && country ? ', ' : ' '}${country ?? ''}`;
};

export const UserCell = (props: Props) => {
  const {
    user: { location, githubAvatar, name, alternateEmails, linkedAccounts },
  } = props;

  const title = getNameFromTalent({ name, alternateEmails, linkedAccounts });

  const locationText = getLocationText(location);

  const avatar = githubAvatar ?? getAvatarSrc(title);

  if (!title) return <EmptyCellPlaceholder />;

  return (
    <div className="max-w-xs overflow-hidden">
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
    </div>
  );
};
