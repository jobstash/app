import { getLogoUrl } from '@jobstash/shared/utils';

import { useProjectDetails } from '@jobstash/projects/state';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  id: string;
  name: string;
  logo?: string | null;
}

export const ProjectSearchItem = ({ id, name, logo }: Props) => {
  const { data } = useProjectDetails(id);

  return (
    <LogoTitle
      title={name}
      avatarProps={{
        alt: name,
        src: getLogoUrl(data?.website ?? null, logo),
      }}
    />
  );
};
