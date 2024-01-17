import { type ProfileRepo } from '@jobstash/profile/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle, Text } from '@jobstash/shared/ui';

interface Props {
  profileRepo: ProfileRepo | null;
}

export const ProfileRightPanelRepoHeader = ({ profileRepo }: Props) => {
  if (!profileRepo) return null;

  const { org, name, description } = profileRepo;

  return (
    <div className="flex flex-col gap-6">
      <Heading size="md">{name}</Heading>
      <Text color="dimmed">{description}</Text>
      <LogoTitle
        title={org.name}
        avatarProps={{
          src: getLogoUrl(org.url, org.logo),
          alt: org.name,
        }}
      />
    </div>
  );
};
