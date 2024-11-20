import { useState } from 'react';

import {
  Button,
  cn,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from '@nextui-org/react';
import { EarthIcon } from 'lucide-react';

import { notifSuccess } from '@jobstash/shared/utils';

import { useCreateJobFolder } from '@jobstash/jobs/state';

import { Heading } from '@jobstash/shared/ui';

export const CreateJobFolderModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate, isPending } = useCreateJobFolder();

  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const onCreate = () => {
    mutate(
      {
        jobs: [],
        name,
        isPublic,
      },
      {
        onSuccess() {
          notifSuccess({
            title: 'Job Post Saved',
            message: `Job post has been added to "${name}"`,
          });
        },
      },
    );
  };

  const isDisabledCreate = !name || isPending;

  return (
    <>
      <Button className="w-fit rounded-lg" onPress={onOpen}>
        New List
      </Button>
      <Modal
        hideCloseButton
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <Heading size="lg">Create Custom List</Heading>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-8 py-4">
                <Input
                  size="lg"
                  radius="sm"
                  label="Name"
                  isDisabled={isPending}
                  classNames={{
                    inputWrapper: 'bg-content2 rounded-md',
                  }}
                  value={name}
                  onValueChange={setName}
                />
                <Switch
                  color="secondary"
                  classNames={{
                    base: cn(
                      'inline-flex flex-row-reverse w-full max-w-full bg-content2 items-center',
                      'justify-between cursor-pointer rounded-md gap-2 px-4 py-2.5 border-2 border-transparent',
                    ),
                    wrapper: 'p-0 h-4 overflow-visible',
                    thumb: cn(
                      'w-6 h-6 border-2 shadow-lg',
                      'group-data-[selected=true]:ml-6',
                      'group-data-[pressed=true]:w-7',
                      'group-data-[selected]:group-data-[pressed]:ml-4',
                    ),
                  }}
                  isDisabled={isPending}
                  isSelected={isPublic}
                  onValueChange={setIsPublic}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <EarthIcon className="w-4 h-4 fill-gray-700" />
                      <Heading size="sm">Visible for everyone</Heading>
                    </div>
                    <p className="text-sm text-default-400">
                      Enable public sharing or restrict to private.
                    </p>
                  </div>
                </Switch>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button isDisabled={isDisabledCreate} onClick={onCreate}>
                  Create List
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
