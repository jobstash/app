import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { useAuthContext } from '@jobstash/auth/state';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const ActiveModal = ({ isOpen, onOpenChange, onClose }: Props) => {
  const { logout, isLoadingLogout } = useAuthContext();

  const onLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Modal
      hideCloseButton
      size="sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <div className="absolute top-3 right-2">
          <Button isIconOnly variant="light" size="sm" onPress={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
        <ModalHeader>Connected Accounts</ModalHeader>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth isLoading={isLoadingLogout} onPress={onLogout}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
