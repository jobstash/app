import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Tab, Tabs } from '@nextui-org/tabs';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { CONTACT_DEFAULT_OPTIONS } from '@jobstash/profile/core';
import { getEmailAvatar } from '@jobstash/profile/utils';
import { cn, notifError } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import {
  useOrgProfileInfo,
  useOrgProfileInfoMutation,
} from '@jobstash/profile/state';
import { useIsMobile } from '@jobstash/shared/state';

import { LogoTitle } from '@jobstash/shared/ui';

export const ProfileOrgForm = () => {
  const { isLoading: isLoadingAuth, flow } = useAuthContext();
  const isSetup = flow === CHECK_WALLET_FLOWS.ORG_PROFILE;
  const isComplete = flow === CHECK_WALLET_FLOWS.ORG_COMPLETE;
  const isRejected = flow === CHECK_WALLET_FLOWS.ORG_REJECTED;

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

  const isMobile = useIsMobile();

  if (!profileInfoData) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* <Heading size="xl">Setup Profile</Heading> */}

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-8">
          <LogoTitle
            title={profileInfoData.email ?? ''}
            avatarProps={{
              src: getEmailAvatar(profileInfoData.email),
              alt: `${profileInfoData.email}'s avatar`,
              isRounded: true,
            }}
            size={isMobile ? 'sm' : 'lg'}
          />
          <Chip
            size={isMobile ? 'md' : 'lg'}
            radius="sm"
            variant="dot"
            color={isComplete ? 'success' : isRejected ? 'default' : 'warning'}
          >
            {isComplete ? 'APPROVED' : isRejected ? 'REJECTED' : 'PENDING'}
          </Chip>
        </div>
      </div>

      <Divider />

      <div className="min-h-[260px]">
        <Tabs
          size="lg"
          aria-label="Setup Org Sections"
          // ClassNames={{ cursor: 'bg-dark' }}
          variant="underlined"
          classNames={{ panel: 'pl-2' }}
        >
          <Tab key="contact" title="Contact Info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isRequired
                isDisabled={isPending}
                label="LinkedIn Page URL"
                description="Showcase your organization's professional profile."
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
                label="Calendly Link"
                description="For streamlined scheduling of meetings."
                classNames={{
                  base: 'w-full',
                  inputWrapper: ['bg-darker-gray'],
                }}
                value={calendly}
                onChange={(e) => setCalendly(e.target.value)}
              />
              <Select
                isDisabled={isPending}
                label="Contact Platform"
                description="Select your preferred platform for us to reach out."
                classNames={{
                  base: 'w-full',
                  trigger: 'bg-darker-gray',
                }}
                selectedKeys={contact.preferred ? [contact.preferred] : []}
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
                description="Provide the handle for the selected contact platform."
                classNames={{
                  base: 'w-full',
                  inputWrapper: ['bg-darker-gray'],
                }}
                value={contact.value}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, value: e.target.value }))
                }
              />
            </div>
          </Tab>
          <Tab key="reference" title="Reference">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isDisabled={isPending}
                label="Reference Name"
                description="Enter the name of the person who vouches for you."
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
                label="Reference Role"
                description="Current or most recent job title of your reference."
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
                label="Contact Platform"
                description="Select the platform your reference prefers for communication e.g. LinkedIn, Email, etc."
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
              <Input
                isDisabled={isPending}
                label="Contact Platform Handle"
                description="Provide the specific handle or ID for the chosen contact platform of your reference."
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
            </div>
          </Tab>
        </Tabs>
      </div>

      <div className="flex w-full pl-2">
        <Button
          isLoading={isPending || isLoadingAuth}
          className={cn(
            'bg-gradient-to-l from-[#8743FF] to-[#4136F1] font-bold',
            { 'w-full mx-2': isMobile },
          )}
          size={isMobile ? 'lg' : 'md'}
          onClick={onSubmit}
        >
          {isSetup ? 'Request Approval' : 'Update Info'}
        </Button>
      </div>
    </div>
  );
};
