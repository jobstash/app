import React from 'react';

import { ProfileGotItCardStatus } from '@jobstash/profile/core';
import { getAvatarSrc } from '@jobstash/shared/utils';

import { useSessionName } from '@jobstash/auth/state';
import {
  ProfileHeaderProvider,
  useProfileHeaderContext,
} from '@jobstash/profile/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { ProfileHeaderInfoButton } from './profile-header-info-button';
import { ProfileHeaderLocation } from './profile-header-location';
import ProfileHeaderSwitch from './profile-header-switch';

interface Props {
  gotItCard: React.ReactNode;
  gotItCardKey: keyof ProfileGotItCardStatus | null;
}

const ProfileHeader = ({ gotItCard, gotItCardKey }: Props) => {
  const { fullText: sessionName, isLoading } = useSessionName();
  const { wallet, username, avatar, email: emails } = useProfileHeaderContext();
  const email = (emails ?? []).length > 0 ? emails[0].email : null;
  return (
    <ProfileHeaderProvider>
      <div className="flex items-end justify-between gap-4 md:items-center md:gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {sessionName && !isLoading && (
            <LogoTitle
              title={sessionName}
              location={<ProfileHeaderLocation />}
              avatarProps={{
                src: avatar ?? getAvatarSrc(wallet) ?? '',
                alt: `${username ?? email ?? ''}`,
                isRounded: true,
              }}
              size="lg"
            />
          )}
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
