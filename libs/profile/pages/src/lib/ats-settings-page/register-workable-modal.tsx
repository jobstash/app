import { useState } from 'react';

import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { ATS_PROVIDERS } from '@jobstash/profile/core';
import { getWebsiteText } from '@jobstash/shared/utils';

import {
  useLinkATSPlatform,
  useRegisterAtsClient,
} from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  orgId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const RegisterWorkableModal = ({
  orgId,
  isOpen,
  onOpenChange,
}: Props) => {
  const { mutate: register, isPending: isPendingRegister } =
    useRegisterAtsClient();

  const { mutate: linkClient, isPending: isPendingLinkClient } =
    useLinkATSPlatform();

  const [workableFormState, setWorkableFormState] = useState<{
    apiToken: string;
    workableUrl: string;
  }>({
    apiToken: '',
    workableUrl: '',
  });

  const onChangeRegisterWorkable = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setWorkableFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickRegisterWorkable = () => {
    const platform = ATS_PROVIDERS.WORKABLE.platformName;
    const workableUrl = getWebsiteText(workableFormState.workableUrl).link;
    register(
      {
        platform,
        payload: {
          apiToken: workableFormState.apiToken,
          workableUrl,
        },
      },
      {
        async onSuccess({ id: clientId }) {
          if (clientId && orgId) {
            linkClient(
              {
                platform,
                payload: { clientId, orgId },
              },
              {
                onSuccess() {
                  onOpenChange();
                },
              },
            );
          }
        },
        onError(error, variables, context) {
          console.log({ error, variables, context });
        },
      },
    );
  };

  const isLoading = isPendingRegister || isPendingLinkClient;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Heading size="sm">Register Workable</Heading>
            </ModalHeader>
            <ModalBody>
              <Card className="p-4 gap-4">
                <Input
                  size="sm"
                  name="apiToken"
                  label="API Token"
                  description="API access tokens from workable"
                  isDisabled={isLoading}
                  onChange={onChangeRegisterWorkable}
                />
                <Input
                  size="sm"
                  name="workableUrl"
                  label="Workable URL"
                  description='e.g. "jobstash.workable.com"'
                  isDisabled={isLoading}
                  onChange={onChangeRegisterWorkable}
                />
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={isLoading} onClick={onClickRegisterWorkable}>
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
