import { type ChangeEventHandler, useEffect, useRef, useState } from 'react';

import {
  CONTACT_DEFAULT_OPTIONS,
  DevProfileInfo,
} from '@jobstash/profile/core';

import { useDevProfileInfoContext } from '../contexts/dev-profile-info-context';

import { useDevProfileInfoMutation } from './use-dev-profile-info-mutation';

export const useProfileHeader = () => {
  const { profileInfoData } = useDevProfileInfoContext();

  const { availableForWork, username, email, avatar, contact, location } =
    profileInfoData ?? ({} as DevProfileInfo);

  const [isAvailableForWork, setIsAvailableForWork] = useState<boolean>(false);
  const [preferredContact, setPreferredContact] = useState<string | null>(
    CONTACT_DEFAULT_OPTIONS[0],
  );
  const [selectedContact, setSelectedContact] = useState<string>('');

  const [currentLocation, setCurrentLocation] = useState<{
    city: string;
    country: string;
  }>({ city: '', country: '' });

  useEffect(() => {
    if (profileInfoData) {
      setIsAvailableForWork(Boolean(availableForWork));
      setPreferredContact(contact.preferred ?? CONTACT_DEFAULT_OPTIONS[0]);
      setSelectedContact(contact.value ?? '');
      setCurrentLocation({
        city: location.city ?? '',
        country: location.country ?? '',
      });
    }
  }, [
    availableForWork,
    contact.preferred,
    contact.value,
    location.city,
    location.country,
    profileInfoData,
  ]);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onChangePreferredContact = (v: string | null) => {
    const isContactPreferred = v === profileInfoData?.contact.preferred;
    const newSelectedContact = isContactPreferred
      ? profileInfoData?.contact.value
      : null;

    setSelectedContact(newSelectedContact ?? '');
    setPreferredContact(v);
  };

  const { isLoadingMutation, mutate } = useDevProfileInfoMutation();

  const saveProfileInfo = () => {
    mutate({
      payload: {
        availableForWork: isAvailableForWork,
        contact: {
          preferred: preferredContact,
          value: selectedContact,
        },
        location: currentLocation,
      },
    });
  };

  const startAutoSave = (value: string) => {
    // Clear existing timeout, set new timeout
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      if (value) {
        saveProfileInfo();
      }
    }, AUTOSAVE_DELAY);
    setTimeoutId(newTimeoutId);
  };

  const onChangeSelectedContact: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setSelectedContact(value);
    startAutoSave(value);
  };

  const onChangeCountry: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setCurrentLocation((prev) => ({ ...prev, country: value }));
    startAutoSave(value);
  };

  const onChangeCity: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setCurrentLocation((prev) => ({
      ...prev,
      city: value,
    }));
    startAutoSave(value);
  };

  // Timeout cleanup
  useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId],
  );

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
        location: currentLocation,
      },
    });
  };

  const prevJSON = JSON.stringify({
    preferredContact: contact?.preferred ?? CONTACT_DEFAULT_OPTIONS[0],
    selectedContact: contact?.value ?? '',
    currentLocation: {
      city: location?.city ?? '',
      country: location?.country ?? '',
    },
  });

  const currentJSON = JSON.stringify({
    preferredContact,
    selectedContact,
    currentLocation,
  });

  const isEqualFetched = prevJSON === currentJSON;

  const disableSave = isEqualFetched;

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
    location: currentLocation,
    contact,
    disableSave,
    onChangePreferredContact,
    onChangeSelectedContact,
    onChangeCountry,
    onChangeCity,
  };
};

const AUTOSAVE_DELAY = 2400;
