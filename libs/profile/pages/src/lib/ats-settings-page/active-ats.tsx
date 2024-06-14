import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RadioGroup } from '@nextui-org/radio';
import { Spinner, useDisclosure } from '@nextui-org/react';

import { ATS_PROVIDERS, ATSPlatform } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import {
  useATSClient,
  useLinkATSPlatform,
  useOrgProfileInfo,
  useRegisterAtsClient,
} from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

import { CustomRadio } from './custom-radio';
import { RegisterGreenhouseModal } from './register-greenhouse-modal';
import { RegisterWorkableModal } from './register-workable-modal';

const LEVER_OAUTH_URL = `${MW_URL}/scorer/oauth/lever`;

const atsProvidersArray = [
  ATS_PROVIDERS.DEFAULT,
  ATS_PROVIDERS.JOBSTASH,
  ATS_PROVIDERS.GREENHOUSE,
  ATS_PROVIDERS.LEVER,
  ATS_PROVIDERS.WORKABLE,
];

export const ActiveATS = () => {
  const router = useRouter();

  const { profileInfoData, isLoading: isLoadingProfile } = useOrgProfileInfo();
  const orgId = profileInfoData?.orgId;

  const { data, isPending: isPendingATSProvider } = useATSClient();

  const [selected, setSelected] = useState<ATSPlatform | string>(
    ATS_PROVIDERS.DEFAULT.platformName,
  );

  useEffect(() => {
    if (data) {
      setSelected(
        data.name ?? (ATS_PROVIDERS.DEFAULT.platformName as ATSPlatform),
      );
    }
  }, [data]);

  const [isLoadingManual, setIsLoadingManual] = useState(false);

  const { mutate: register, isPending: isPendingRegister } =
    useRegisterAtsClient();
  const { mutate: linkClient, isPending: isPendingLinkClient } =
    useLinkATSPlatform();

  const {
    isOpen: isOpenWorkableModal,
    onOpen: openWorkableModal,
    onOpenChange: onOpenChangeWorkableModal,
  } = useDisclosure();

  const {
    isOpen: isOpenGreenhouseModal,
    onOpen: openGreenhouseModal,
    onOpenChange: onOpenChangeGreenhouseModal,
  } = useDisclosure();

  const onValueChange = async (value: string) => {
    if (value === ATS_PROVIDERS.DEFAULT.platformName) {
      // TODO: Disable Applicants Sidebar
      // TODO: Disable "other" forms
      return;
    }

    if (value === ATS_PROVIDERS.JOBSTASH.platformName && orgId) {
      // TODO: Enable Applicants Sidebar
      // TODO: Enable "other" forms
      const platform = ATS_PROVIDERS.JOBSTASH.platformName;
      register(
        {
          platform,
          payload: {
            apiToken: undefined,
            userId: undefined,
            workableUrl: undefined,
          },
        },
        {
          async onSuccess({ id: clientId }) {
            if (clientId && orgId) {
              linkClient({
                platform,
                payload: { clientId, orgId },
              });
            }
          },
        },
      );

      return;
    }

    if (value === ATS_PROVIDERS.WORKABLE.platformName) {
      openWorkableModal();
      return;
    }

    if (value === ATS_PROVIDERS.GREENHOUSE.platformName) {
      openGreenhouseModal();
      return;
    }

    if (value === ATS_PROVIDERS.LEVER.platformName) {
      setIsLoadingManual(true);
      router.push(LEVER_OAUTH_URL);
    }
  };

  const isLoading = [
    isPendingATSProvider,
    isLoadingProfile,
    isLoadingManual,
    isPendingRegister,
    isPendingLinkClient,
  ].includes(true);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <Heading size="sm">Select Active ATS:</Heading>
        {isLoading && <Spinner color="white" size="sm" />}
      </div>

      <div className="pl-4">
        <RadioGroup
          defaultValue="jobstash"
          orientation="horizontal"
          classNames={{ wrapper: 'gap-4' }}
          value={isLoading ? '' : selected}
          isDisabled={
            isLoading || selected !== ATS_PROVIDERS.DEFAULT.platformName
          }
          onValueChange={onValueChange}
        >
          {atsProvidersArray.map((provider) => (
            <CustomRadio
              key={provider.platformName}
              description={provider.siteLabel}
              value={provider.platformName}
            >
              {provider.label}
            </CustomRadio>
          ))}
        </RadioGroup>
      </div>

      {orgId && (
        <RegisterWorkableModal
          orgId={orgId}
          isOpen={isOpenWorkableModal}
          onOpenChange={onOpenChangeWorkableModal}
        />
      )}

      {orgId && (
        <RegisterGreenhouseModal
          orgId={orgId}
          isOpen={isOpenGreenhouseModal}
          onOpenChange={onOpenChangeGreenhouseModal}
        />
      )}
    </div>
  );
};
