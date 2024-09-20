import { Button, Spinner, useDisclosure } from '@nextui-org/react';

import { useAuthContext, useSessionInfo } from '@jobstash/auth/state';

import { ActiveModal } from './active-modal';
import { ButtonWrapper } from './button-wrapper';

const DEFAULT_TEXT = 'Login / Sign Up';

export const PrivyButton = () => {
  const { isLoggedIn, showLoginModal } = useAuthContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const onClick = isLoggedIn ? onOpen : showLoginModal;

  const { isLoading, name } = useSessionInfo();
  const text = name ?? DEFAULT_TEXT;

  return (
    <>
      <ButtonWrapper>
        <Button
          fullWidth
          radius="md"
          className="font-bold h-full"
          onClick={onClick}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : text}
        </Button>
      </ButtonWrapper>
      <ActiveModal
        text={text}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
