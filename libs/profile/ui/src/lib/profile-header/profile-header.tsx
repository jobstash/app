import { ProfileHeaderProvider } from '@jobstash/profile/state';

import ProfileHeaderContentWrapper from './content-wrapper';
import ProfileHeaderPreferredContactInput from './profile-header-preferred-contact-input';
import ProfileHeaderSaveButton from './profile-header-save-button';
import ProfileHeaderSelectedContactInput from './profile-header-selected-contact-input';
import ProfileHeaderTitle from './profile-header-title';

const ProfileHeader = () => (
  <ProfileHeaderProvider>
    <ProfileHeaderContentWrapper>
      <ProfileHeaderTitle />

      <div className="flex justify-between items-center gap-8">
        <div className="flex gap-4 grow">
          <div className="w-1/2">
            <ProfileHeaderPreferredContactInput />
          </div>
          <div className="w-1/2">
            <ProfileHeaderSelectedContactInput />
          </div>
        </div>
        <div>
          <ProfileHeaderSaveButton />
        </div>
      </div>
    </ProfileHeaderContentWrapper>
  </ProfileHeaderProvider>
);

export default ProfileHeader;
