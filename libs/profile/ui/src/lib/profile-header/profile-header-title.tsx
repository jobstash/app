import { useProfileHeaderContext } from '@jobstash/profile/state';

import { LogoTitle } from '@jobstash/shared/ui';

import ProfileHeaderSwitch from './profile-header-switch';

const ProfileHeaderTitle = () => {
  const { username, avatar } = useProfileHeaderContext();

  return (
    <div className="flex items-center gap-6">
      <LogoTitle
        title={username ?? ''}
        avatarProps={{
          src: avatar ?? '',
          alt: `${username ?? ''}`,
          isRounded: true,
        }}
        size="lg"
      />
      <ProfileHeaderSwitch />
    </div>
  );
};

export default ProfileHeaderTitle;
