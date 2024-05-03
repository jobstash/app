import { NextApiRequest, NextApiResponse } from 'next';

import checkLinks from 'check-links';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { urls } = req.query;

    if (typeof urls !== 'string') {
      return res.status(400).json({ error: 'invalid url query' });
    }

    const decoded = JSON.parse(decodeURIComponent(urls)) as string[];
    const prefixed = decoded.map((website) =>
      website.startsWith('http') ? website : `https://${website}`,
    );

    const results = await checkLinks(prefixed, {
      retry: { limit: 2 },
      timeout: { request: 30_000 },
      throwHttpErrors: false,
    });

    res.json({
      success: true,
      data: Object.entries(results).map(([k, v], i) => ({
        website: decoded[i],
        ...v,
      })),
    });
  } catch {
    res.status(500).json({ success: false, data: [] });
  }
};

export default handler;
