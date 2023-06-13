import { SIWEConfig } from 'connectkit';

interface Options {
  nonce?: string;
  message?: string;
  address?: string;
  chainId?: number;
  verify: ({
    message,
    signature,
  }: {
    message: string;
    signature: string;
  }) => Promise<boolean>;
  logout: () => Promise<null>;
}

export const getSiweConfig = ({
  nonce,
  message,
  address,
  chainId,
  verify,
  logout,
}: Options): SIWEConfig => ({
  getNonce: () => Promise.resolve(nonce ?? ''),
  createMessage: () => message ?? '',
  async verifyMessage({ message, signature }) {
    try {
      await verify({ message, signature });
    } catch {
      return false;
    }

    return true;
  },
  getSession: async () => ({ address: address ?? '', chainId: chainId ?? 1 }),
  async signOut() {
    try {
      await logout();
    } catch {
      return false;
    }

    return true;
  },
});
