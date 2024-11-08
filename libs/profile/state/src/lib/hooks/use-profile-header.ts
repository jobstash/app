import { useEffect, useState } from 'react';

import { UserProfile } from '@jobstash/shared/core';

import { useProfileInfoContext } from '../contexts/profile-info-context';

import { useUpdateAvailability } from './use-update-availability';

export const useProfileHeader = () => {
  const { profileInfoData } = useProfileInfoContext();

  const { availableForWork, wallet, location, githubAvatar } =
    profileInfoData ?? ({} as UserProfile);

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
