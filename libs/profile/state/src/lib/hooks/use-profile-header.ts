import { useEffect, useState } from 'react';

import { DevProfileInfo } from '@jobstash/profile/core';

import { useDevProfileInfoContext } from '../contexts/dev-profile-info-context';

import { useDevProfileInfoMutation } from './use-dev-profile-info-mutation';

export const useProfileHeader = () => {
  const { profileInfoData } = useDevProfileInfoContext();

  const { availableForWork, username, email, avatar, contact, location } =
    profileInfoData ?? ({} as DevProfileInfo);

  const [isAvailableForWork, setIsAvailableForWork] = useState<boolean>(false);

  useEffect(() => {
    if (profileInfoData) {
      setIsAvailableForWork(Boolean(availableForWork));
    }
  }, [availableForWork, contact, location, profileInfoData]);

  const { isLoadingMutation, mutate } = useDevProfileInfoMutation();

  const updateAvailability = (isChecked: boolean) => {
    setIsAvailableForWork(isChecked);
    if (profileInfoData && profileInfoData.preferred) {
      mutate({
        isToggleAvailability: true,
        payload: {
          availableForWork: isChecked,
          preferred: profileInfoData.preferred,
          contact: profileInfoData.contact,
          location: profileInfoData.location,
        },
      });
    }
  };

  const isLoading = isLoadingMutation || !profileInfoData;

  return {
    isLoading,
    isAvailableForWork,
    setIsAvailableForWork,
    updateAvailability,
    username,
    email,
    avatar,
    preferredContact: profileInfoData?.preferred ?? null,
    contact: profileInfoData?.contact ?? null,
  };
};

const AUTOSAVE_DELAY = 2400;
