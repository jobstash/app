import React from 'react';

import { Avatar } from '@heroui/avatar';

import { ProfileGotItCardStatus } from '@jobstash/profile/core';
import { getAvatarSrc } from '@jobstash/shared/utils';

import { useSessionInfo } from '@jobstash/auth/state';
import { ProfileHeaderProvider } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

import { ProfileHeaderInfoButton } from './profile-header-info-button';
import { ProfileHeaderLocation } from './profile-header-location';
import ProfileHeaderSwitch from './profile-header-switch';

interface Props {
  gotItCard: React.ReactNode;
  gotItCardKey: keyof ProfileGotItCardStatus | null;
}

const ProfileHeader = ({ gotItCard, gotItCardKey }: Props) => {
  const { isLoading, name, avatar } = useSessionInfo();

  return (
    <ProfileHeaderProvider>
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <div className="flex flex-col @xl:flex-row gap-6 @xl:items-center">
          {name && !isLoading && (
            <div className="flex items-center w-fit gap-x-3">
              <Avatar
                src={avatar ?? getAvatarSrc(name)}
                alt={name}
                className="w-14 h-14 text-large"
              />
              <div className="flex flex-col justify-center">
                <Heading size="md">{name}</Heading>
                <ProfileHeaderLocation />
              </div>
            </div>
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
