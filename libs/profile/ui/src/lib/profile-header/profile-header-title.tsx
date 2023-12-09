import { getEmailAvatar } from '@jobstash/profile/utils';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { LogoTitle } from '@jobstash/shared/ui';

import ProfileHeaderSwitch from './profile-header-switch';

const ProfileHeaderTitle = () => {
  const { username, avatar, email } = useProfileHeaderContext();

  return (
    <div className="flex items-center gap-6">
      <LogoTitle
        title={username ?? email ?? ''}
        avatarProps={{
          src: avatar ?? email ? getEmailAvatar(email) : '',
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
