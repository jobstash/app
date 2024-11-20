import { useState } from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';

import { JobFolder } from '@jobstash/jobs/core';

import { useDeleteJobFolder } from '@jobstash/jobs/state';
import { useIsDesktop } from '@jobstash/shared/state';

import { Heading, ThrashIcon } from '@jobstash/shared/ui';

interface Props {
  jobFolder: JobFolder;
}

export const DeleteJobFolderModal = ({ jobFolder }: Props) => {
  const { id, name } = jobFolder;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [inputValue, setInputValue] = useState('');

  const { isPending, mutate } = useDeleteJobFolder(id);
  const onDelete = () => {
    mutate();
  };

  const isDisabledDelete = inputValue !== name || isPending;

  const isDesktop = useIsDesktop();

  return (
    <>
      <Tooltip content="Delete List">
        <Button
          isIconOnly
          size="sm"
          color="danger"
          variant="faded"
          onClick={onOpen}
        >
          <ThrashIcon />
        </Button>
      </Tooltip>
      <Modal
        hideCloseButton
        backdrop="blur"
        className="p-4"
        placement={isDesktop ? 'auto' : 'top'}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <Heading size="lg">{`Delete "${name}" List`}</Heading>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-8 py-4">
                <Input
                  label="Confirm Delete"
                  placeholder="Enter the name of the list to be deleted"
                  radius="sm"
                  classNames={{
                    inputWrapper: 'bg-content2 rounded-lg',
                  }}
                  isDisabled={isPending}
                  value={inputValue}
                  onValueChange={setInputValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  radius="sm"
                  className="bg-red-700 font-bold"
                  isDisabled={isDisabledDelete}
                  onClick={onDelete}
                >
                  Delete List
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
