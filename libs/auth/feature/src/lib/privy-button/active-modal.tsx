import { useRouter } from 'next/router';

import {
  ArrowRightStartOnRectangleIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
} from '@nextui-org/react';

import { notifSuccess } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { Heading } from '@jobstash/shared/ui';

import { ButtonWrapper } from './button-wrapper';

const ICONS_CLASSNAME = 'h-6 w-6';
const COPY_TOOLTIP = 'Copy';
const LOGOUT_TOOLTIP = 'Logout';

interface Props {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const ActiveModal = ({ text, isOpen, onOpenChange, onClose }: Props) => {
  const { logout, isLoadingLogout } = useAuthContext();

  const onLogout = async () => {
    await logout();
    onClose();
  };

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    notifSuccess({
      title: `Copied to clipboard!`,
      message: `"${text}"`,
    });
  };

  const { push, isReady } = useRouter();
  const onExploreProfile = () => {
    onClose();
    push('/profile');
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
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
        <ModalHeader>
          <Heading size="md">Current Account</Heading>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-between py-2">
            <div
              className={cn('flex items-center gap-2', {
                'opacity-40': isLoadingLogout,
              })}
            >
              <ButtonWrapper>
                <Button
                  fullWidth
                  isDisabled={isLoadingLogout}
                  radius="md"
                  className="h-full font-bold"
                >
                  <span className='truncate'>{text}</span>
                </Button>
              </ButtonWrapper>
              <Tooltip content={COPY_TOOLTIP}>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="text-white/85"
                  onPress={onCopy}
                >
                  <DocumentDuplicateIcon className={ICONS_CLASSNAME} />
                </Button>
              </Tooltip>
            </div>
            <Tooltip content={LOGOUT_TOOLTIP}>
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                size="sm"
                onPress={onLogout}
              >
                {isLoadingLogout ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <ArrowRightStartOnRectangleIcon
                    className={cn(ICONS_CLASSNAME)}
                  />
                )}
              </Button>
            </Tooltip>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            size="lg"
            className="justify-start px-3 font-bold text-md"
            style={{
              background: 'linear-gradient(90deg, #8743FF, #D68800)',
            }}
            isDisabled={isLoadingLogout || !isReady}
            startContent={
              isReady ? <UserCircleIcon /> : <Spinner size="sm" color="white" />
            }
            onPress={onExploreProfile}
          >
            <div className="flex items-center justify-between w-full">
              <span>Explore your profile</span>
              <ChevronRightIcon className="w-5 h-5 stroke-2" />
            </div>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
