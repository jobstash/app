import { useEffect, useRef, useState } from 'react';

import { ProfileInfo } from '@jobstash/profile/core';

import { useProfileInfoContext } from '../contexts/profile-info-context';

import { useProfileInfoMutation } from './use-profile-info-mutation';

export const useProfileHeader = () => {
  const { profileInfoData } = useProfileInfoContext();

  const { availableForWork, username, avatar, contact } =
    profileInfoData ?? ({} as ProfileInfo);

  const [isAvailableForWork, setIsAvailableForWork] = useState<boolean>(false);
  const [preferredContact, setPreferredContact] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const initRef = useRef(false);
  useEffect(() => {
    if (profileInfoData && !initRef.current) {
      initRef.current = true;
      setIsAvailableForWork(availableForWork);
      setPreferredContact(contact.preferred);
      setSelectedContact(contact.value);
    }
  }, [
    contact,
    preferredContact,
    selectedContact,
    availableForWork,
    profileInfoData,
  ]);

  const { isLoading, mutate } = useProfileInfoMutation();

  const saveProfileInfo = () => {
    mutate({
      avatar,
      username,
      availableForWork: isAvailableForWork,
      contact: {
        options: contact.options,
        preferred: preferredContact,
        value: selectedContact,
      },
    });
  };

  const disableSave =
    JSON.stringify({
      availableForWork,
      preferredContact: contact?.preferred,
      selectedContact: contact?.value,
    }) ===
    JSON.stringify({
      availableForWork: isAvailableForWork,
      preferredContact,
      selectedContact,
    });

  return {
    isLoading,
    isAvailableForWork,
    setIsAvailableForWork,
    preferredContact,
    setPreferredContact,
    selectedContact,
    setSelectedContact,
    saveProfileInfo,
    username,
    avatar,
    contact,
    disableSave,
  };
};
