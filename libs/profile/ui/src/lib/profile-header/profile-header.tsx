import React from 'react';

import { ProfileGotItCardStatus } from '@jobstash/profile/core';
import { getEmailAvatar } from '@jobstash/profile/utils';

import {
  ProfileHeaderProvider,
  useProfileHeaderContext,
} from '@jobstash/profile/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { ProfileHeaderInfoButton } from './profile-header-info-button';
import ProfileHeaderSwitch from './profile-header-switch';

interface Props {
  gotItCard: React.ReactNode;
  gotItCardKey: keyof ProfileGotItCardStatus | null;
}

const ProfileHeader = ({ gotItCard, gotItCardKey }: Props) => {
  const { username, avatar, email } = useProfileHeaderContext();
  return (
    <ProfileHeaderProvider>
      <div className="flex justify-between items-end md:items-center gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <LogoTitle
            title={username ?? email ?? ''}
            avatarProps={{
              src: avatar ?? getEmailAvatar(email),
              alt: `${username ?? email ?? ''}`,
              isRounded: true,
            }}
            size="lg"
          />
          <ProfileHeaderSwitch />
        </div>
        {gotItCardKey && (
          <ProfileHeaderInfoButton gotItCardKey={gotItCardKey} />
        )}
      </div>
      {gotItCard}
    </ProfileHeaderProvider>
  );
};

const ProfileHeaderWithProvider = ({ gotItCard, gotItCardKey }: Props) => (
  <ProfileHeaderProvider>
    <ProfileHeader gotItCard={gotItCard} gotItCardKey={gotItCardKey} />
  </ProfileHeaderProvider>
);

export default ProfileHeaderWithProvider;
