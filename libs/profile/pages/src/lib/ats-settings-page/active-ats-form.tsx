import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  Button,
  Chip,
  RadioGroup,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';

import { ATS_PROVIDERS, ATSClient, ATSPlatform } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import {
  useLinkATSPlatform,
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

interface Props {
  orgId?: string | null;
  atsClient?: ATSClient;
}

export const ActiveATSForm = ({ orgId, atsClient }: Props) => {
  const router = useRouter();

  const [selectedATS, setSelectedATS] = useState<ATSPlatform | string>(
    ATS_PROVIDERS.DEFAULT.platformName as ATSPlatform,
  );

  useEffect(() => {
    if (atsClient?.name) {
      setSelectedATS(atsClient.name);
    }
  }, [atsClient?.name]);

  const onValueChange = (value: string) => {
    setSelectedATS(value);
  };

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

  const [isLoadingManual, setIsLoadingManual] = useState(false);

  const { mutate: register, isPending: isPendingRegister } =
    useRegisterAtsClient();

  const { mutate: linkClient, isPending: isPendingLinkClient } =
    useLinkATSPlatform();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedATS === ATS_PROVIDERS.DEFAULT.platformName) {
      return;
    }

    if (selectedATS === ATS_PROVIDERS.JOBSTASH.platformName && orgId) {
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

    if (selectedATS === ATS_PROVIDERS.WORKABLE.platformName) {
      openWorkableModal();
      return;
    }

    if (selectedATS === ATS_PROVIDERS.GREENHOUSE.platformName) {
      openGreenhouseModal();
      return;
    }

    if (selectedATS === ATS_PROVIDERS.LEVER.platformName) {
      setIsLoadingManual(true);
      router.push(LEVER_OAUTH_URL);
    }
  };

  const isLoading = [
    !atsClient,
    !orgId,
    isLoadingManual,
    isPendingRegister,
    isPendingLinkClient,
  ].includes(true);

  const hasPreviousSelection =
    Boolean(atsClient?.name) &&
    atsClient?.name !== ATS_PROVIDERS.DEFAULT.platformName;

  const isDisabledSave =
    selectedATS === ATS_PROVIDERS.DEFAULT.platformName ||
    selectedATS === atsClient?.name;

  const isUnsaved =
    atsClient?.name !== selectedATS &&
    selectedATS !== ATS_PROVIDERS.DEFAULT.platformName;

  return (
    <>
      <div className="flex items-center gap-4 h-10">
        <Heading size="sm">Select Active ATS:</Heading>
        {isUnsaved && (
          <Chip size="sm" radius="sm" color="warning" variant="dot">
            Unsaved
          </Chip>
        )}
        {isLoading && <Spinner color="white" size="sm" />}
      </div>

      <form className="pl-4 space-y-4" onSubmit={onSubmit}>
        <RadioGroup
          defaultValue="jobstash"
          orientation="horizontal"
          classNames={{ wrapper: 'gap-4' }}
          value={isLoading ? '' : selectedATS}
          isDisabled={isLoading || hasPreviousSelection}
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

        <Button type="submit" isDisabled={isDisabledSave || isLoading}>
          Save ATS Selection
        </Button>
      </form>

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
    </>
  );
};
