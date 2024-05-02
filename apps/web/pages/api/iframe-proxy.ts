import { NextApiRequest, NextApiResponse } from 'next';

import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  return new Promise<void>((resolve, reject) => {
    proxy.web(
      req,
      res,
      {
        target: url as string,
        changeOrigin: true,
        headers: {
          mode: 'no-cors',
        },
      },
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      },
    );
  });
};

export default handler;
