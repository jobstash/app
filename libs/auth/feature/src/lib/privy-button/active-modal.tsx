import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { usePrivy } from '@privy-io/react-auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const ActiveModal = ({ isOpen, onOpenChange, onClose }: Props) => {
  const { logout } = usePrivy();

  const onLogout = () => {
    logout();
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
          <Button fullWidth onPress={onLogout}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
