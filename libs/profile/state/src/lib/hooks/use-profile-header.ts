import { useEffect, useState } from 'react';

import { DevProfileInfo } from '@jobstash/profile/core';

import { useDevProfileInfoContext } from '../contexts/dev-profile-info-context';

import { useUpdateAvailability } from './use-update-availability';

export const useProfileHeader = () => {
  const { profileInfoData } = useDevProfileInfoContext();

  const { availableForWork, wallet, location, githubAvatar } =
    profileInfoData ?? ({} as DevProfileInfo);

  const [isAvailableForWork, setIsAvailableForWork] = useState<boolean>(false);

  useEffect(() => {
    if (profileInfoData) {
      setIsAvailableForWork(Boolean(availableForWork));
    }
  }, [availableForWork, location, profileInfoData]);

  const { mutate: mutateAvailability, isPending: isLoadingAvailability } =
    useUpdateAvailability();
  const updateAvailability = (isChecked: boolean) => {
    setIsAvailableForWork(isChecked);
    mutateAvailability(
      { availability: isChecked },
      {
        onError() {
          setIsAvailableForWork(!isChecked);
        },
      },
    );
  };

  const isLoading = !profileInfoData || isLoadingAvailability;

  return {
    isLoading,
    isAvailableForWork,
    updateAvailability,
    wallet,
    githubAvatar,
    location: profileInfoData?.location ?? null,
  };
};
