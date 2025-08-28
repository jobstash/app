import {
  ArrowRightStartOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/modal';
import { Spinner } from '@heroui/spinner';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';

import { Heading, Text } from '@jobstash/shared/ui';

const ICONS_CLASSNAME = 'h-6 w-6';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const LogoutConfirmModal = ({
  isOpen,
  onOpenChange,
  onClose,
}: Props) => {
  const { logout, isLoadingLogout } = useAuthContext();

  const { mwVersion } = useMwVersionContext();
  const queryClient = useQueryClient();

  const onLogout = async () => {
    await logout();

    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'profile-info'],
    });
    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'affiliated-orgs'],
    });

    onClose();
  };

  return (
    <Modal
      hideCloseButton
      size="sm"
      isOpen={isOpen}
      isKeyboardDismissDisabled={false}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="self-center mx-6 md:mx-0 p-2">
        <div className="absolute top-3 right-2">
          <Button isIconOnly variant="light" size="sm" onPress={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
        <ModalHeader>
          <Heading size="md">Confirm Logout</Heading>
        </ModalHeader>
        <ModalBody>
          <Text color="dimmed">
            Are you sure you want to logout? You will need to reconnect your
            wallet to access your account again.
          </Text>
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button
            variant="flat"
            color="default"
            className="flex-1"
            isDisabled={isLoadingLogout}
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="flat"
            color="danger"
            className="flex-1 text-red-400"
            isDisabled={isLoadingLogout}
            startContent={
              isLoadingLogout ? (
                <Spinner size="sm" color="white" />
              ) : (
                <ArrowRightStartOnRectangleIcon className={ICONS_CLASSNAME} />
              )
            }
            onPress={onLogout}
          >
            {isLoadingLogout ? 'Logging out...' : 'Logout'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
