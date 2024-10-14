import { useRouter } from 'next/router';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Trash2 } from 'lucide-react';

import { notifSuccess } from '@jobstash/shared/utils';

import { useDeleteOrg } from '@jobstash/admin/state';

interface Props {
  id: string;
  isDisabled?: boolean;
}

export const DeleteOrgModal = ({ id, isDisabled }: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: deleteOrg, isPending: isDeleting } = useDeleteOrg(id);

  const onDelete = () => {
    deleteOrg(undefined, {
      onSuccess({ message }) {
        notifSuccess({
          title: 'Organization Deleted',
          message,
        });
        onOpenChange();
        router.push('/godmode/organizations/manage');
      },
    });
  };

  return (
    <>
      <Button
        size="sm"
        className="bg-red-700 font-bold"
        startContent={<Trash2 className="h-4 w-4 -mt-0.5" />}
        isDisabled={isDisabled || isDeleting}
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        className="text-white p-2"
        backdrop="blur"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-3xl font-bold">Delete Organization</span>
              </ModalHeader>
              <ModalBody>
                <span className="text-xl font-bold pb-2">
                  Are you sure you want to delete this organization?
                </span>
                <span className="text-red-500/80 font-bold">
                  This action cannot be undone and will remove all associated
                  data permanently.
                </span>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isDeleting}
                  className="bg-red-700 font-bold"
                  onPress={onDelete}
                >
                  DELETE
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
