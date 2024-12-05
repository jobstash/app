import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { useQueryClient } from '@tanstack/react-query';

import { usePreferredTermsFormContext } from '@jobstash/admin/state';
import { useMwVersionContext } from '@jobstash/shared/state';

const PreferredTermsActions = () => {
  const { mwVersion } = useMwVersionContext();
  const queryClient = useQueryClient();

  const {
    initPrimaryTerm,
    initSynonyms,
    primaryTerm,
    synonyms,
    synonymsState: { created, deleted },
    clearForm,
    isLoading,
    mutateAsyncDeletePreference,
    mutateAsyncCreatePreference,
    mutateAsyncDeleteSynonyms,
  } = usePreferredTermsFormContext();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const invalidateQueries = async () => {
    queryClient.invalidateQueries({
      queryKey: [mwVersion, 'preferredTerms'],
    });
  };

  const onDelete = async () => {
    await mutateAsyncDeletePreference(
      {
        preferredName: primaryTerm,
      },
      {
        async onSuccess() {
          await invalidateQueries();
          onClose();
        },
      },
    );
  };

  const onSubmit = async () => {
    const promises = [];
    if (created.length > 0) {
      promises.push(
        mutateAsyncCreatePreference({
          preferredName: primaryTerm,
          synonyms: created,
        }),
      );
    }

    if (deleted.length > 0) {
      promises.push(
        mutateAsyncDeleteSynonyms({
          preferredName: primaryTerm,
          synonyms: deleted,
        }),
      );
    }

    await Promise.allSettled(promises);

    clearForm();

    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'preferredTerms'],
    });
  };

  const isDisabledSubmit =
    !primaryTerm || JSON.stringify(initSynonyms) === JSON.stringify(synonyms);

  return (
    <>
      <div className="w-full flex justify-end">
        <div className="flex gap-4 items-end">
          {primaryTerm && (
            <Button
              radius="sm"
              variant="light"
              className="text-red-600"
              isDisabled={isLoading}
              onClick={onOpen}
            >
              Delete
            </Button>
          )}
          <Button
            radius="sm"
            isDisabled={isDisabledSubmit}
            isLoading={isLoading}
            onClick={onSubmit}
          >
            {initPrimaryTerm ? 'Save Changes' : 'Create Preference'}
          </Button>
        </div>
      </div>
      <Modal
        hideCloseButton
        backdrop="blur"
        className="text-white p-1"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>Confirm Delete</p>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 px-2">
                  <span className="text-lg text-white/80 pb-2">
                    You are about to delete{' '}
                    <span className="font-bold text-white">{`"${primaryTerm}"`}</span>{' '}
                    tag
                  </span>
                  <span className="text-base text-red-500/80">
                    This action cannot be undone and will remove all associated
                    data permanently.
                  </span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  radius="sm"
                  className="bg-red-700 font-bold"
                  isLoading={isLoading}
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreferredTermsActions;
