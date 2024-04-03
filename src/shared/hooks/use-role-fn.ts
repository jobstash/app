import { useModal } from 'connectkit';

import { WalletRole } from '~/users/core/schemas';
import { useWalletData } from '~/users/hooks/use-wallet-data';

interface Props {
  role: WalletRole | WalletRole[];
  fn: () => void;
}

export const useRoleFn = ({ role, fn }: Props) => {
  const { setOpen } = useModal();
  const { data } = useWalletData();
  const currentRole = data?.data.role;

  const isAuthd = Array.isArray(role)
    ? role.includes(currentRole as (typeof role)[number])
    : currentRole === role;

  const authdFn = () => (isAuthd ? fn() : setOpen(true));

  return {
    isAuthd,
    authdFn,
  };
};
