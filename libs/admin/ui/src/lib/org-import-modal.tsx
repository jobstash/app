import { useState } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';

import { cn } from '@jobstash/shared/utils';

import { useOrgImport } from '@jobstash/admin/state';
import { useIsDesktop } from '@jobstash/shared/state';

export const OrgImportModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const { mutate: importOrg, isPending: isImporting } = useOrgImport();

  const onClear = () => {
    setName('');
    setUrl('');
  };

  const onCancel = () => {
    onClear();
    onClose();
  };

  const onImport = () => {
    importOrg(
      { name, url },
      {
        onSuccess() {
          onClear();
          onOpenChange();
        },
      },
    );
  };

  const isDesktop = useIsDesktop();

  return (
    <>
      <Button className="w-fit" onPress={onOpen}>
        Import Another Organization
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        placement={isDesktop ? 'auto' : 'top'}
        className={cn('text-white p-2', { 'mt-2': !isDesktop })}
        backdrop="blur"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span className="text-3xl font-bold">Import Organization</span>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-6">
            <span className="text-md text-white/90">
              Fill in the fields below to import details about an organization.
              Our AI will automatically crawl the website to gather additional
              information.
            </span>
            <Input
              isRequired
              radius="sm"
              size="sm"
              label="Organization Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              isRequired
              radius="sm"
              size="sm"
              label="Website"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onCancel}>
              Cancel
            </Button>
            <Button isLoading={isImporting} onPress={onImport}>
              Queue Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
