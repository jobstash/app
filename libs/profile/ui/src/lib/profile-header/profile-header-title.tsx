import { getEmailAvatar } from '@jobstash/profile/utils';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { LogoTitle } from '@jobstash/shared/ui';

import ProfileHeaderSwitch from './profile-header-switch';

const ProfileHeaderTitle = () => {
  const { username, avatar, email } = useProfileHeaderContext();

  return (
    <div className="flex flex-col py-4 md:flex-row md:items-center gap-4 md:gap-8">
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
  );
};

export default ProfileHeaderTitle;
