import ProfileHeaderCityInput from './profile-header-city-input';
import ProfileHeaderCountryInput from './profile-header-country-input';
import ProfileHeaderLayout from './profile-header-layout';
import ProfileHeaderPreferredContactInput from './profile-header-preferred-contact-input';
import ProfileHeaderSaveButton from './profile-header-save-button';
import ProfileHeaderSelectedContactInput from './profile-header-selected-contact-input';

export const ProfileHeaderContactInfo = () => (
  <ProfileHeaderLayout
    preferredInput={<ProfileHeaderPreferredContactInput />}
    selectedInput={<ProfileHeaderSelectedContactInput />}
    countryInput={<ProfileHeaderCountryInput />}
    cityInput={<ProfileHeaderCityInput />}
    saveButton={<ProfileHeaderSaveButton />}
  />
);
