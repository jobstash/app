import { useState } from 'react';

import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import { useCreateJobsite } from '../hooks/use-create-jobsite';

import { OrgJobsiteFormFields } from './org-jobsite-form-fields';

interface Payload {
  orgId: string;
  url: string;
  type: string;
}

interface Props {
  orgId: string;
}

export const OrgJobsiteModal = ({ orgId }: Props) => {
  const DEFAULT_FORM_STATE: Payload = {
    orgId,
    url: '',
    type: '',
  };

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [formState, setFormState] = useState<Payload>(DEFAULT_FORM_STATE);

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, url: e.target.value }));
  };

  const onChangeJobsiteType = (selectedKey: string) => {
    setFormState((prev) => ({ ...prev, type: selectedKey }));
  };

  const onClear = () => {
    setFormState(DEFAULT_FORM_STATE);
  };

  const onCancel = () => {
    onClear();
    onClose();
  };

  const { mutate: createJobsite, isPending } = useCreateJobsite();

  const onSubmit = () => {
    createJobsite(
      { ...formState, orgId },
      {
        onSuccess: onCancel,
      },
    );
  };

  return (
    <>
      <Chip
        size="sm"
        className="hover:cursor-pointer select-none"
        radius="sm"
        onClick={onOpen}
      >
        Add Jobsite
      </Chip>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        className="text-white p-2"
        backdrop="blur"
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span className="text-3xl font-bold">Add Jobsite</span>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-6">
            <span className="text-md text-white/90">
              Enter the organization&#39;s career/jobs page url below to set up
              job crawling. Our AI will automatically fetch job postings and
              other relevant details.
            </span>

            <OrgJobsiteFormFields
              formState={{
                url: formState.url,
                type: formState.type,
              }}
              isDisabled={isPending}
              onChangeUrl={onChangeUrl}
              onChangeJobsiteType={onChangeJobsiteType}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onCancel}>
              Cancel
            </Button>
            <Button isLoading={isPending} onPress={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
