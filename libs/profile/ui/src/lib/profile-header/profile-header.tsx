import { ProfileHeaderProvider } from '@jobstash/profile/state';

import ProfileHeaderContentWrapper from './content-wrapper';
import ProfileHeaderCityInput from './profile-header-city-input';
import ProfileHeaderCountryInput from './profile-header-country-input';
import ProfileHeaderLayout from './profile-header-layout';
import ProfileHeaderPreferredContactInput from './profile-header-preferred-contact-input';
import ProfileHeaderSaveButton from './profile-header-save-button';
import ProfileHeaderSelectedContactInput from './profile-header-selected-contact-input';
import ProfileHeaderTitle from './profile-header-title';

const ProfileHeader = () => (
  <ProfileHeaderProvider>
    <ProfileHeaderContentWrapper>
      <ProfileHeaderLayout
        header={<ProfileHeaderTitle />}
        preferredInput={<ProfileHeaderPreferredContactInput />}
        selectedInput={<ProfileHeaderSelectedContactInput />}
        countryInput={<ProfileHeaderCountryInput />}
        cityInput={<ProfileHeaderCityInput />}
        saveButton={<ProfileHeaderSaveButton />}
      />
    </ProfileHeaderContentWrapper>
  </ProfileHeaderProvider>
);

export default ProfileHeader;
