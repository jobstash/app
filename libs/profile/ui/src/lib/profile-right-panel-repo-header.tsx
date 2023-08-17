import { memo } from 'react';

import { type ProfileRepo } from '@jobstash/profile/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle, Text } from '@jobstash/shared/ui';

interface Props {
  profileRepo: ProfileRepo | null;
}

const ProfileRightPanelRepoHeader = ({ profileRepo }: Props) => {
  if (!profileRepo) return null;

  const { org, name, description } = profileRepo;

  return (
    <div className="flex flex-col gap-6">
      <Heading size="md">{name}</Heading>
      <Text color="dimmed">{description}</Text>
      <LogoTitle
        title={org.name}
        avatarProps={{
          src: org.logo ?? getGoogleLogoUrl(org.url),
          alt: org.name,
        }}
      />
    </div>
  );
};

export default memo(ProfileRightPanelRepoHeader);