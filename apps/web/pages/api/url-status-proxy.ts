/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiRequest, NextApiResponse } from 'next';

import checkLinks from 'check-links';

import { prefixUrl } from '@jobstash/admin/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { urls, domainPrefix } = req.query;

    if (typeof urls !== 'string') {
      return res.status(400).json({ error: 'invalid url query' });
    }

    const decoded = [
      ...new Set(urls.split(',').sort((a, b) => a.localeCompare(b))),
    ];

    const prefixed = decoded.map((url) =>
      prefixUrl(url, domainPrefix as string | undefined),
    );

    const results = await checkLinks(prefixed, {
      retry: { limit: 2 },
      timeout: { request: 30_000 },
      throwHttpErrors: true,
    });

    const data = Object.entries(results!)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([, v], i) => ({
        url: decoded[i],
        ...v,
      }));

    res.json({
      success: true,
      data,
    });
  } catch {
    res.status(500).json({ success: false, data: [] });
  }
};

export default handler;
