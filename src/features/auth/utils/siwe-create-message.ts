import type { SIWEConfig } from 'connectkit/build/siwe';
import { SiweMessage } from 'siwe';

export const siweCreateMessage: SIWEConfig['createMessage'] = ({
  nonce,
  address,
  chainId,
}) =>
  new SiweMessage({
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    address,
    chainId,
    nonce,
    statement: `I am ${
      address.slice(0, 4) + '...' + address.slice(-4)
    } and I want to sign in to ${window.location.host}`,
  }).prepareMessage();
