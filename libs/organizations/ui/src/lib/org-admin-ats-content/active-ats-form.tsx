import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { useDisclosure } from '@heroui/modal';
import { RadioGroup } from '@heroui/radio';
import { Spinner } from '@heroui/spinner';

import {
  ATS_PROVIDERS,
  ATSClient,
  ATSPlatform,
} from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';

import {
  useLinkATSPlatform,
  useRegisterAtsClient,
} from '@jobstash/organizations/state';

import { Heading } from '@jobstash/shared/ui';

import { CustomRadio } from './custom-radio';
import { GreenhouseCopypasta } from './greenhouse-copypasta';
import { RegisterGreenhouseModal } from './register-greenhouse-modal';
import { RegisterWorkableModal } from './register-workable-modal';
import { RetryWorkable } from './retry-workable';

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
                redirectPath: window?.location.pathname,
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

      <form className="pl-4" onSubmit={onSubmit}>
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
              isDisabled={isLoading || hasPreviousSelection}
              infoUrl={provider.infoUrl}
              setupGuideUrl={provider.setupGuideUrl}
            >
              {provider.label}
            </CustomRadio>
          ))}
        </RadioGroup>

        {isUnsaved && (
          <Button type="submit" isDisabled={isDisabledSave || isLoading}>
            Save ATS Selection
          </Button>
        )}
      </form>

      {atsClient && atsClient.id && !atsClient.hasWebhooks && (
        <>
          {atsClient.name === ATS_PROVIDERS.WORKABLE.platformName && (
            <RetryWorkable
              clientId={atsClient.id}
              platform={ATS_PROVIDERS.WORKABLE.platformName}
            />
          )}
          {atsClient.name === ATS_PROVIDERS.GREENHOUSE.platformName && (
            <GreenhouseCopypasta atsClient={atsClient} />
          )}
        </>
      )}

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
