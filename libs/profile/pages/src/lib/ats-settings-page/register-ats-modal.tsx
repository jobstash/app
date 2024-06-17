import { useState } from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { RegisterATSClientPayload } from '@jobstash/profile/core';

import {
  useLinkATSPlatform,
  useRegisterAtsClient,
} from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  orgId: string;
  isOpen: boolean;
  onOpenChange: () => void;
  platformName: string;
  formFields: { name: string; label: string; description: string }[];
  payloadHandler: (
    formState: RegisterATSClientPayload,
  ) => RegisterATSClientPayload;
  headerText: string;
}

const RegisterAtsModal = ({
  orgId,
  isOpen,
  onOpenChange,
  platformName,
  formFields,
  payloadHandler,
  headerText,
}: Props) => {
  const { mutate: register, isPending: isPendingRegister } =
    useRegisterAtsClient();
  const { mutate: linkClient, isPending: isPendingLinkClient } =
    useLinkATSPlatform();

  const [formState, setFormState] = useState<{ [key: string]: string }>({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClick = () => {
    const payload = payloadHandler(formState);
    register(
      {
        platform: platformName,
        payload,
      },
      {
        async onSuccess({ id: clientId, ...tokens }) {
          if (clientId && orgId) {
            linkClient(
              {
                platform: platformName,
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
              <Heading size="sm">{headerText}</Heading>
            </ModalHeader>
            <ModalBody>
              <div className="p-4 gap-4 flex flex-col">
                {formFields.map((field) => (
                  <Input
                    key={field.name}
                    size="sm"
                    name={field.name}
                    label={field.label}
                    description={field.description}
                    isDisabled={isLoading}
                    onChange={onChange}
                  />
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={isLoading} onClick={onClick}>
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RegisterAtsModal;
