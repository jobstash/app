import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { usePreferredTermsFormContext } from '@jobstash/admin/state';

import { Button, Heading, Text } from '@jobstash/shared/ui';

const PreferredTermsActions = () => {
  const {
    primaryTerm,
    onSubmit,
    onDelete,
    isDisabledSubmit,
    isExisting,
    isLoadingMutation,
  } = usePreferredTermsFormContext();

  const [
    openedDeleteModal,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const onConfirmDelete = () => {
    closeDeleteModal();
    onDelete();
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <div className="flex gap-4 items-center">
          {isExisting && (
            <Button
              className="px-6 bg-red-500"
              isDisabled={isLoadingMutation}
              onClick={openDeleteModal}
            >
              Delete
            </Button>
          )}
          <Button
            variant="primary"
            className="px-6"
            isDisabled={isDisabledSubmit}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
      <Modal.Root
        centered
        opened={openedDeleteModal}
        title={`Delete "${primaryTerm}" preference`}
        onClose={closeDeleteModal}
      >
        <Modal.Overlay opacity={0.85} blur={0.5} />
        <Modal.Content className="md:rounded-3xl">
          <Modal.Header>
            <Modal.CloseButton iconSize={32} />
          </Modal.Header>
          <Modal.Body className="flex flex-col p-8 gap-8">
            <Heading size="lg" fw="bold">
              Confirm Delete
            </Heading>
            <div className="flex flex-col gap-2 px-2">
              <Text color="dimmed" size="lg">
                You are about to delete preference for tag
              </Text>
              <Text color="dimmed" size="lg">
                {`"${primaryTerm}"`}
              </Text>
            </div>
            <div className="flex items-center justify-end w-full">
              <Button
                className="px-6 bg-red-500"
                isDisabled={isLoadingMutation}
                onClick={onConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default PreferredTermsActions;
