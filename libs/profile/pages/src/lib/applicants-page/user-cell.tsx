import { LogoTitle } from '@jobstash/shared/ui';

import { getLocationText } from './get-location-text';
import { CellProps } from './types';

export const UserCell = ({ data }: CellProps) => {
  if (!data) return null;

  const {
    user: { avatar, username, email, location },
  } = data;

  const title = username ?? (email as string);
  const locationText = getLocationText(location);

  return (
    <LogoTitle
      key={title}
      title={title}
      location={locationText}
      avatarProps={{
        src: avatar ?? '',
        alt: username ?? email ?? '',
        name: username ?? email ?? '',
      }}
    />
  );
};
