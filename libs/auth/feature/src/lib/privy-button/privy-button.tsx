import { useRouter } from 'next/router';

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { Spinner } from '@heroui/spinner';
import { Tooltip } from '@heroui/tooltip';
import { usePrivy } from '@privy-io/react-auth';

import { useAuthContext, useSessionInfo } from '@jobstash/auth/state';
import { useDebouncedValue } from '@jobstash/shared/state';

import { ButtonWrapper } from './button-wrapper';
import { LogoutConfirmModal } from './logout-confirm-modal';

const DEFAULT_TEXT = 'Login / Sign Up';

interface Props {
  text?: string;
}

export const PrivyButton = ({ text: title }: Props) => {
  const { ready } = usePrivy();
  const { isLoggedIn, showLoginModal } = useAuthContext();
  const { isOpen, onOpen: openModal, onClose, onOpenChange } = useDisclosure();

  const { isLoading: isLoadingSession, name } = useSessionInfo();
  const text = title ?? name ?? DEFAULT_TEXT;

  const isLoading = isLoadingSession || !ready;
  const debouncedLoading = useDebouncedValue(isLoading, 300);

  const content = debouncedLoading ? (
    <div className="flex h-full items-center justify-center">
      <Spinner size="sm" color="white" />
    </div>
  ) : (
    text
  );

  const router = useRouter();
  const onProfileNav = () => {
    router.push('/profile');
  };

  const onClick = isLoggedIn ? onProfileNav : showLoginModal;

  return (
    <>
      <div className="flex items-center gap-2">
        <ButtonWrapper>
          <Button
            fullWidth
            radius="md"
            className="h-full font-bold w-[18ch]"
            isDisabled={debouncedLoading}
            onPress={onClick}
          >
            <span className="truncate">{content}</span>
          </Button>
        </ButtonWrapper>
        {isLoggedIn && (
          <Tooltip content="Logout">
            <Button
              isIconOnly
              variant="flat"
              className="h-10 w-10 [&>svg]:h-6 text-red-500"
              onPress={openModal}
            >
              <ArrowRightStartOnRectangleIcon />
            </Button>
          </Tooltip>
        )}
      </div>
      <LogoutConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
