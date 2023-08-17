import { LoadingOverlay } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { LogoTitle } from '@jobstash/shared/ui';

import ProfileHeaderSwitch from './profile-header-switch';

const ProfileHeaderTitle = () => {
  const { isLoading, username, avatar } = useProfileHeaderContext();

  return (
    <>
      <LoadingOverlay visible={isLoading} />

      <div className="flex items-center gap-6">
        <LogoTitle
          title={username}
          avatarProps={{
            src: avatar,
            alt: `${username}'s avatar`,
            isRounded: true,
          }}
          size="lg"
        />
        <ProfileHeaderSwitch />
      </div>
    </>
  );
};

export default ProfileHeaderTitle;
