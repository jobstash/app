import { Button, Spinner, useDisclosure } from '@nextui-org/react';
import { usePrivy } from '@privy-io/react-auth';
import { useSetAtom } from 'jotai';

import {
  isOrgCheckWalletAtom,
  useAuthContext,
  useSessionInfo,
} from '@jobstash/auth/state';
import { useDebouncedValue } from '@jobstash/shared/state';

import { ActiveModal } from './active-modal';
import { ButtonWrapper } from './button-wrapper';

const DEFAULT_TEXT = 'Login / Sign Up';

interface Props {
  isOrg?: boolean;
  text?: string;
}

export const PrivyButton = ({ isOrg = false, text: title }: Props) => {
  const { ready } = usePrivy();
  const { isLoggedIn, showLoginModal } = useAuthContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const setIsOrgCheckWallet = useSetAtom(isOrgCheckWalletAtom);

  const openLoginModal = () => {
    setIsOrgCheckWallet(isOrg);
    showLoginModal();
  };

  const onClick = isLoggedIn ? onOpen : openLoginModal;

  const { isLoading: isLoadingSession, name } = useSessionInfo();
  const text = title ?? name ?? DEFAULT_TEXT;

  const isLoading = isLoadingSession || !ready;
  const debouncedLoading = useDebouncedValue(isLoading, 300);

  return (
    <>
      <ButtonWrapper>
        <Button
          fullWidth
          radius="md"
          className="font-bold h-full"
          isDisabled={debouncedLoading}
          onClick={onClick}
        >
          {debouncedLoading ? <Spinner size="sm" color="white" /> : text}
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
