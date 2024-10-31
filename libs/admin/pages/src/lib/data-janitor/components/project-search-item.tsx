import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  name: string;
  website: string | null;
  logo?: string | null;
}

export const ProjectSearchItem = ({ website, name, logo }: Props) => (
  <LogoTitle
    title={name}
    avatarProps={{
      alt: name,
      src: getLogoUrl(website ?? null, logo),
    }}
  />
);
