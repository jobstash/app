import { ProfileHeaderProvider } from '@jobstash/profile/state';

import ProfileHeaderPreferredContactInput from './profile-header-preferred-contact-input';
import ProfileHeaderSaveButton from './profile-header-save-button';
import ProfileHeaderSelectedContactInput from './profile-header-selected-contact-input';
import ProfileHeaderTitle from './profile-header-title';

const ProfileHeader = () => (
  <ProfileHeaderProvider>
    <ProfileHeaderTitle />

    <div className="flex justify-between items-center">
      <ProfileHeaderPreferredContactInput />
      <ProfileHeaderSelectedContactInput />
      <ProfileHeaderSaveButton />
    </div>
  </ProfileHeaderProvider>
);

export default ProfileHeader;
