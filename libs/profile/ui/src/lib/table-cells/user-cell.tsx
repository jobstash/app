import { LogoTitle } from '@jobstash/shared/ui';

import { EmptyCellPlaceholder } from '../empty-cell-placeholder';

interface Location {
  city: string | null;
  country: string | null;
}

interface Props {
  user?: {
    wallet: string;
    avatar: string | null;
    username: string | null;
    email: { email: string; main: boolean }[];
    location: Location;
  };
}

const getLocationText = (location: Location) => {
  const { city, country } = location;

  return !city && !country
    ? undefined
    : `${city ? `${city}` : ''}${city && country ? ', ' : ' '}${country ?? ''}`;
};

export const UserCell = ({ user }: Props) => {
  if (!user) return <EmptyCellPlaceholder />;

  const { wallet, avatar, username, email: emails, location } = user;
  const email = emails.length > 0 ? emails[0].email : undefined;

  const title = username ?? email;
  const locationText = getLocationText(location);

  if (!title) return <EmptyCellPlaceholder />;

  return (
    <LogoTitle
      key={title}
      identiconFallback
      title={title ?? ''}
      location={locationText}
      avatarProps={{
        src: avatar ?? '',
        alt: username ?? email ?? wallet,
        name: username ?? email ?? wallet,
      }}
    />
  );
};
