import { useState } from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import { AddOrgSearchInput } from '../components/add-org-search-input';
import { useProjectImport } from '../hooks/use-project-import';

interface Payload {
  url: string;
  name: string;
  orgId?: string;
  defiLlamaSlug?: string;
}

const DEFAULT_FORM_STATE: Payload = {
  url: '',
  name: '',
  orgId: undefined,
  defiLlamaSlug: undefined,
};

export const ProjectImportModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: importProject, isPending: isImporting } = useProjectImport();

  const [formState, setFormState] = useState<Payload>(DEFAULT_FORM_STATE);
  const handleFieldChange = (key: keyof Payload, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onClear = () => {
    setFormState(DEFAULT_FORM_STATE);
  };

  const onCancel = () => {
    onClear();
    onClose();
  };

  const onImport = () => {
    importProject(formState, {
      onSuccess() {
        onCancel();
      },
    });
  };

  const onAddOrg = (id: string) => {
    handleFieldChange('orgId', id);
  };

  return (
    <>
      <Button className="w-fit" onPress={onOpen}>
        Import Project
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        className="text-white p-2"
        backdrop="blur"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span className="text-3xl font-bold">Import Project</span>
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
              label="Url"
              value={formState.url}
              onChange={(e) => handleFieldChange('url', e.target.value)}
            />

            <Input
              isRequired
              radius="sm"
              size="sm"
              label="Name"
              value={formState.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />

            <AddOrgSearchInput
              isPending={false}
              labelText="Organization (optional)"
              variant="flat"
              showSpinnerOnSelect={false}
              onAddOrg={onAddOrg}
            />

            <Input
              radius="sm"
              size="sm"
              label="DefiLlama Slug"
              value={formState.defiLlamaSlug}
              onChange={(e) =>
                handleFieldChange('defiLlamaSlug', e.target.value)
              }
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
