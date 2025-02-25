import { useState } from 'react';

import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';
import { UseMutationResult } from '@tanstack/react-query';

import { Jobsite } from '@jobstash/shared/core';

import { JobsiteFormFields } from './jobsite-form-fields';
interface Props<R> {
  id: string;
  useCreateJobsite: () => UseMutationResult<R, Error, Jobsite, unknown>;
}

export const JobsiteModal = <R,>({ id, useCreateJobsite }: Props<R>) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const DEFAULT_FORM_STATE = {
    id,
    url: '',
    type: '',
  };

  const [formState, setFormState] = useState<Jobsite>(DEFAULT_FORM_STATE);

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

  const { mutate, isPending } = useCreateJobsite();

  const onSubmit = () => {
    mutate(formState, {
      onSuccess: onCancel,
    });
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

            <JobsiteFormFields
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
