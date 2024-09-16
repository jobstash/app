import { Button, Spinner, useDisclosure } from '@nextui-org/react';

import { useAuthContext, useSessionName } from '@jobstash/auth/state';

import { ActiveModal } from './active-modal';
import { ButtonWrapper } from './button-wrapper';

export const PrivyButton = () => {
  const { isLoggedIn, showLoginModal } = useAuthContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { text, fullText, isLoading } = useSessionName();
  const onClick = isLoggedIn ? onOpen : showLoginModal;

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
        fullText={fullText}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
