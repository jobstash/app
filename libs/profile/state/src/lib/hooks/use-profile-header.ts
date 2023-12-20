import { type ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { CONTACT_DEFAULT_OPTIONS, ProfileInfo } from '@jobstash/profile/core';

import { useProfileInfoContext } from '../contexts/profile-info-context';

import { useProfileInfoMutation } from './use-profile-info-mutation';

export const useProfileHeader = () => {
  const { profileInfoData } = useProfileInfoContext();

  const { availableForWork, username, email, avatar, contact } =
    profileInfoData ?? ({} as ProfileInfo);

  const [isAvailableForWork, setIsAvailableForWork] = useState<boolean>(false);
  const [preferredContact, setPreferredContact] = useState<string | null>(
    CONTACT_DEFAULT_OPTIONS[0],
  );
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const initRef = useRef(false);
  useEffect(() => {
    if (profileInfoData && !initRef.current) {
      initRef.current = true;
      setIsAvailableForWork(Boolean(availableForWork));
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

  const onChangePreferredContact = (v: string | null) => {
    const isContactPreferred = v === profileInfoData?.contact.preferred;
    const newSelectedContact = isContactPreferred
      ? profileInfoData?.contact.value
      : null;

    setSelectedContact(newSelectedContact);
    setPreferredContact(v);
  };

  const onChangeSelectedContact: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedContact(e.currentTarget.value);
  };

  const { isLoadingMutation, mutate } = useProfileInfoMutation();

  const saveProfileInfo = () => {
    mutate({
      payload: {
        availableForWork: isAvailableForWork,
        contact: {
          preferred: preferredContact,
          value: selectedContact,
        },
      },
    });
  };

  const updateAvailability = (isChecked: boolean) => {
    setIsAvailableForWork(isChecked);
    mutate({
      isToggleAvailability: true,
      payload: {
        availableForWork: isChecked,
        contact: {
          preferred: preferredContact,
          value: selectedContact,
        },
      },
    });
  };

  const isEqualFetched =
    JSON.stringify({
      preferredContact: contact?.preferred,
      selectedContact: contact?.value,
    }) ===
    JSON.stringify({
      preferredContact,
      selectedContact,
    });

  const disableSave = !selectedContact || isEqualFetched;

  const isLoading = isLoadingMutation || !profileInfoData;

  return {
    isLoading,
    isAvailableForWork,
    setIsAvailableForWork,
    preferredContact,
    setPreferredContact,
    selectedContact,
    setSelectedContact,
    saveProfileInfo,
    updateAvailability,
    username,
    email,
    avatar,
    contact,
    disableSave,
    onChangePreferredContact,
    onChangeSelectedContact,
  };
};
