import type { SIWEConfig } from 'connectkit/build/siwe';
import { SiweMessage } from 'siwe';

const API_MW_URL = process.env['NEXT_PUBLIC_MW_URL'];

export const siweConfig: SIWEConfig = {
  getNonce: async () =>
    fetch(`${API_MW_URL}/siwe/nonce`, {
      credentials: 'include',
      mode: 'cors',
    }).then((res) => res.text()),
  createMessage: ({ nonce, address, chainId }) =>
    new SiweMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: 'Sign in With Ethereum.',
    }).prepareMessage(),
  verifyMessage: async ({ message, signature }) =>
    fetch(`${API_MW_URL}/siwe/verify`, {
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
    }).then((res) => res.ok),
  getSession: async () =>
    fetch(`${API_MW_URL}/siwe/session`, {
      mode: 'cors',
      credentials: 'include',
    }).then((res) => (res.ok ? res.json() : null)),
  signOut: async () =>
    fetch(`${API_MW_URL}/siwe/logout`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.ok),
};
