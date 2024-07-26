import { Button, Spinner, useDisclosure } from '@nextui-org/react';

import { cn } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { ActiveModal } from './active-modal';
import { useButtonText } from './use-button-text';

const wrapperStyle = {
  background:
    'linear-gradient(0deg, #1E1E1E, #1E1E1E) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
  border: '2px solid transparent',
};

export const PrivyButton = () => {
  const { isAuthenticated, showLoginModal } = useAuthContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { text, isLoading } = useButtonText();
  const onClick = isAuthenticated ? onOpen : showLoginModal;

  return (
    <>
      <div className={cn('h-10 w-44 rounded-lg')} style={wrapperStyle}>
        <Button
          fullWidth
          radius="sm"
          className="font-bold h-full bg-transparent"
          onClick={onClick}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : text}
        </Button>
      </div>
      <ActiveModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
