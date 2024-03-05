import { useEffect, useState } from 'react';

import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Tab, Tabs } from '@nextui-org/tabs';

import { CONTACT_DEFAULT_OPTIONS } from '@jobstash/profile/core';
import { getEmailAvatar } from '@jobstash/profile/utils';
import { notifError } from '@jobstash/shared/utils';

import {
  useOrgProfileInfo,
  useOrgProfileInfoMutation,
} from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

export const ProfileOrgForm = () => {
  const [linkedin, setLinkedin] = useState('');
  const [calendly, setCalendly] = useState('');
  const [contact, setContact] = useState<{ value: string; preferred: string }>({
    value: '',
    preferred: '',
  });
  const [internalReference, setInternalReference] = useState<{
    referencePersonName: string;
    referencePersonRole: string;
    referenceContact: string;
    referenceContactPlatform: string;
  }>({
    referencePersonName: '',
    referencePersonRole: '',
    referenceContact: '',
    referenceContactPlatform: '',
  });

  const [errors, setErrors] = useState({
    linkedin: '',
  });
  const resetErrors = () => setErrors({ linkedin: '' });

  const { profileInfoData } = useOrgProfileInfo();

  // Sync input values
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (profileInfoData && !initialized) {
      const {
        linkedin,
        calendly,
        contact,
        internalReference: {
          referencePersonName,
          referencePersonRole,
          referenceContact,
          referenceContactPlatform,
        },
      } = profileInfoData;
      setLinkedin(linkedin ?? '');
      setCalendly(calendly ?? '');
      setContact({
        value: contact.value ?? '',
        preferred: contact.preferred ?? '',
      });
      setInternalReference({
        referencePersonName: referencePersonName ?? '',
        referencePersonRole: referencePersonRole ?? '',
        referenceContact: referenceContact ?? '',
        referenceContactPlatform: referenceContactPlatform ?? '',
      });
      setInitialized(true);
    }
  }, [initialized, profileInfoData]);

  const { isPending, mutate } = useOrgProfileInfoMutation();
  const onSubmit = () => {
    resetErrors();

    // Manual validation (for now - in the future use schema validation instead)
    if (linkedin.length === 0) {
      setErrors((prev) => ({ ...prev, linkedin: 'LinkedIn is required' }));
      notifError({
        title: 'LinkedIn is required',
        message: 'Please provide info for required fields',
      });
      return;
    }

    mutate({
      linkedin,
      calendly,
      contact,
      internalReference,
    });
  };

  return (
    <div className="p-8 flex flex-col gap-4 border border-darker-gray h-fit rounded-3xl w-full">
      {/* <Heading size="xl">Setup Profile</Heading> */}

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Avatar
            src={getEmailAvatar(profileInfoData?.email ?? '')}
            alt={`${profileInfoData?.email}'s avatar`}
          />
          <Text fw="semibold" size="lg">
            {profileInfoData?.email}
          </Text>
        </div>
        <Chip size="lg" radius="sm" variant="dot" color="warning">
          PENDING
        </Chip>
      </div>

      <Divider />
      <Tabs
        size="lg"
        aria-label="Setup Org Sections"
        // ClassNames={{ cursor: 'bg-dark' }}
        variant="underlined"
        classNames={{ panel: 'pl-2' }}
      >
        <Tab key="basic" title="Basic">
          <div className="flex flex-col gap-4">
            <Input
              isRequired
              isDisabled={isPending}
              label="LinkedIn"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              errorMessage={errors.linkedin}
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <Input
              isDisabled={isPending}
              label="Calendly"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              value={calendly}
              onChange={(e) => setCalendly(e.target.value)}
            />
          </div>
        </Tab>
        <Tab key="contact" title="Contact">
          <div className="flex flex-col gap-4">
            <Select
              isDisabled={isPending}
              label="Contact Platform"
              classNames={{
                base: 'w-full',
                trigger: 'bg-darker-gray',
              }}
              selectedKeys={contact.preferred ? [contact.preferred] : []}
              description="Select your preferred platform for us to reach out."
              onChange={(e) =>
                setContact((prev) => ({ ...prev, preferred: e.target.value }))
              }
            >
              {CONTACT_DEFAULT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
            <Input
              isDisabled={isPending}
              label="Platform Handle"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              description="Provide the handle for the selected platform."
              value={contact.value}
              onChange={(e) =>
                setContact((prev) => ({ ...prev, value: e.target.value }))
              }
            />
          </div>
        </Tab>
        <Tab key="reference" title="Reference">
          <div className="grid grid-cols-2 gap-4">
            <Input
              isDisabled={isPending}
              label="Person Name"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              value={internalReference.referencePersonName}
              onChange={(e) =>
                setInternalReference((prev) => ({
                  ...prev,
                  referencePersonName: e.target.value,
                }))
              }
            />
            <Input
              isDisabled={isPending}
              label="Person Role"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              value={internalReference.referencePersonRole}
              onChange={(e) =>
                setInternalReference((prev) => ({
                  ...prev,
                  referencePersonRole: e.target.value,
                }))
              }
            />
            <Input
              isDisabled={isPending}
              label="Contact"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              value={internalReference.referenceContact}
              onChange={(e) =>
                setInternalReference((prev) => ({
                  ...prev,
                  referenceContact: e.target.value,
                }))
              }
            />
            <Input
              isDisabled={isPending}
              label="Contact Platform"
              classNames={{
                base: 'w-full',
                inputWrapper: ['bg-darker-gray'],
              }}
              value={internalReference.referenceContactPlatform}
              onChange={(e) =>
                setInternalReference((prev) => ({
                  ...prev,
                  referenceContactPlatform: e.target.value,
                }))
              }
            />
          </div>
        </Tab>
      </Tabs>

      <div className="flex w-full justify-end">
        <Button
          isLoading={isPending}
          className="bg-gradient-to-l from-[#8743FF] to-[#4136F1] font-bold"
          onClick={onSubmit}
        >
          Request Approval
        </Button>
      </div>

      <ul>
        <li>
          NOTE: This is not final - i just wing it to contain a form for
          org-info
        </li>
        <li>TODO: adjust form layout - make it look nicer in general</li>
        <li>
          TODO: add description and better labels for inputs (see Contact tab)
        </li>
        <li>
          TODO: add another modal for profile setup (current modal is for
          pending)
        </li>
        <li>TODO: update texts when user already requested approval</li>
      </ul>
    </div>
  );
};
