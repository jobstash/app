import { LogoTitle } from '@jobstash/shared/ui';

interface Location {
  city: string | null;
  country: string | null;
}

interface Props {
  user?: {
    wallet: string;
    avatar: string | null;
    username: string | null;
    email: string | null;
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
  if (!user) return null;

  const { wallet, avatar, username, email, location } = user;

  const title = username ?? (email as string);
  const locationText = getLocationText(location);

  return (
    <LogoTitle
      key={title}
      identiconFallback
      title={title}
      location={locationText}
      avatarProps={{
        src: avatar ?? '',
        alt: username ?? email ?? wallet,
        name: username ?? email ?? wallet,
      }}
    />
  );
};
