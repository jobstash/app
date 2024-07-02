import React, { useEffect, useState } from 'react';

import { Button, Input, Spinner } from '@nextui-org/react';

import { CONTACT_FIELDS, LOCATION_FIELDS } from '@jobstash/profile/core';
import { capitalize, notifError } from '@jobstash/shared/utils';

import {
  useDevProfileInfoContext,
  useDevProfileInfoMutation,
} from '@jobstash/profile/state';

import { PreferredButton } from './preferred-button';

interface Contact {
  email: string | null;
  discord: string | null;
  telegram: string | null;
  farcaster: string | null;
  lens: string | null;
  twitter: string | null;
}

interface Location {
  city: string | null;
  country: string | null;
}

export const ProfileHeaderContactInfo = () => {
  const [preferred, setPreferred] = useState<string | null>(null);
  const [preferredMutated, setPreferredMutated] = useState<string | null>(null);

  const [contact, setContact] = useState<Contact>({
    email: '',
    discord: '',
    telegram: '',
    farcaster: '',
    lens: '',
    twitter: '',
  });

  const [location, setLocation] = useState<Location>({
    country: '',
    city: '',
  });

  const { profileInfoData } = useDevProfileInfoContext();

  useEffect(() => {
    if (profileInfoData) {
      if (
        profileInfoData.preferred &&
        profileInfoData.contact[profileInfoData.preferred as keyof Contact]
      ) {
        setPreferred(profileInfoData.preferred);
      }

      setContact(profileInfoData.contact);
      setLocation(profileInfoData.location);
    }
  }, [profileInfoData]);

  const onChangeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { isLoadingMutation, mutate } = useDevProfileInfoMutation();

  const updatePreferred = (name: string) => {
    if (profileInfoData) {
      setPreferredMutated(name);
      mutate(
        {
          isToggleAvailability: false,
          payload: {
            availableForWork: Boolean(profileInfoData.availableForWork),
            contact,
            location,
            preferred: name,
          },
        },
        {
          onSuccess() {
            setPreferred(name);
            setPreferredMutated(null);
          },
        },
      );
    }
  };

  const hasContact = Object.values(contact).some(
    (field) => field && field.trim() !== '',
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasContact) {
      notifError({
        title: 'Submission Failed!',
        message: 'Please fill at least one field to save your contact info',
      });
      return;
    }

    if (profileInfoData) {
      // Default to the first field if no preferred contact is set
      const hasValueCount = Object.values(contact).filter(Boolean).length;
      const preferredContact =
        hasValueCount === 1
          ? Object.keys(contact).find((key) =>
              Boolean(contact[key as keyof Contact]?.trim()),
            )
          : preferred;

      if (!preferredContact) {
        notifError({
          title: 'Submission Failed!',
          message: 'Please fill at least one field to save your contact info',
        });
        return;
      }

      mutate({
        isToggleAvailability: false,
        payload: {
          availableForWork: Boolean(profileInfoData.availableForWork),
          contact,
          location,
          preferred: preferredContact,
        },
      });
    }
  };

  const isUnchanged =
    JSON.stringify({
      preferred: profileInfoData?.preferred,
      contact: profileInfoData?.contact,
      location: profileInfoData?.location,
    }) ===
    JSON.stringify({
      preferred,
      contact,
      location,
    });

  return (
    <form
      className="grid md:grid-cols-2 gap-6 pt-0 p-2 pb-4"
      onSubmit={handleSubmit}
    >
      {CONTACT_FIELDS.map((name) => (
        <div key={name} className="h-10 min-h-[40px]">
          <Input
            name={name}
            label={capitalize(name)}
            size="sm"
            value={contact[name as keyof Contact] ?? ''}
            endContent={
              <PreferredButton
                isEmpty={!contact[name as keyof Contact]}
                isLoading={isLoadingMutation && preferredMutated === name}
                isPreferred={
                  preferred === name &&
                  profileInfoData?.contact[name as keyof Contact] !== null
                }
                onClick={() => updatePreferred(name)}
              />
            }
            isDisabled={isLoadingMutation}
            onChange={onChangeContact}
          />
        </div>
      ))}

      {LOCATION_FIELDS.map((name) => (
        <div key={name} className="h-10 min-h-[40px]">
          <Input
            name={name}
            label={capitalize(name)}
            size="sm"
            value={location[name as keyof Location] ?? ''}
            isDisabled={isLoadingMutation}
            onChange={onChangeLocation}
          />
        </div>
      ))}

      <Button
        type="submit"
        className="w-fit"
        isDisabled={isUnchanged || isLoadingMutation}
      >
        {isLoadingMutation && !preferredMutated ? (
          <Spinner size="sm" color="white" />
        ) : (
          'Save'
        )}
      </Button>
    </form>
  );
};
