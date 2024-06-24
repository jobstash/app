import { useModal } from 'connectkit';
import { useSetAtom } from 'jotai';

import { type CheckWalletRole } from '@jobstash/auth/core';

import { bypassDevSignupAtom } from '../atoms/bypass-dev-signup-atom';

import { useAuthContext } from './use-auth-context';

interface Props {
  role: CheckWalletRole;
  bypassDevSignup?: boolean;
  callback: () => void;
}

export const useRoleClick = ({
  role,
  callback,
  bypassDevSignup = false,
}: Props) => {
  const { setOpen } = useModal();
  const { role: currentRole } = useAuthContext();
  const isAuthd = currentRole === role;

  const setBypassDevSignup = useSetAtom(bypassDevSignupAtom);
  if (bypassDevSignup) {
    setBypassDevSignup(true);
  }

  return {
    isAuthd,
    roleClick: () => (isAuthd ? callback() : setOpen(true)),
  };
};
