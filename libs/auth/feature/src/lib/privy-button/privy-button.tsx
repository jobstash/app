import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { Spinner } from '@heroui/spinner';
import { usePrivy } from '@privy-io/react-auth';

import { useAuthContext, useSessionInfo } from '@jobstash/auth/state';
import { useDebouncedValue } from '@jobstash/shared/state';

import { ActiveModal } from './active-modal';
import { ButtonWrapper } from './button-wrapper';

const DEFAULT_TEXT = 'Login / Sign Up';

interface Props {
  text?: string;
}

export const PrivyButton = ({ text: title }: Props) => {
  const { ready } = usePrivy();
  const { isLoggedIn, showLoginModal } = useAuthContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const onClick = isLoggedIn ? onOpen : showLoginModal;

  const { isLoading: isLoadingSession, name } = useSessionInfo();
  const text = title ?? name ?? DEFAULT_TEXT;

  const isLoading = isLoadingSession || !ready;
  const debouncedLoading = useDebouncedValue(isLoading, 300);

  const content = debouncedLoading ? (
    <div className="flex h-full items-center">
      <Spinner size="sm" color="white" />
    </div>
  ) : (
    text
  );

  return (
    <>
      <ButtonWrapper>
        <Button
          fullWidth
          radius="md"
          className="h-full font-bold"
          isDisabled={debouncedLoading}
          onClick={onClick}
        >
          <span className="truncate">{content}</span>
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
