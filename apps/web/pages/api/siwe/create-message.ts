import { type NextApiRequest, type NextApiResponse } from 'next';

import { SiweMessage } from 'siwe';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  const { nonce, address, domain, uri, host } = query as unknown as {
    nonce: string;
    address: string;
    domain: string;
    uri: string;
    host: string;
  };

  const siweMessage = new SiweMessage({
    version: '1',
    domain,
    uri,
    address,
    chainId: 1, // Default to ethereum chain
    nonce,
    statement: `I am ${
      address.slice(0, 4) + '...' + address.slice(-4)
    } and I want to sign in to ${host}`,
  }).prepareMessage();

  return res.status(200).json({ siweMessage });
}
