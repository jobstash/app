import type { NextApiRequest, NextApiResponse } from 'next';

import { getGoogleLogoUrl } from '@jobstash/shared/utils';

const isImageContent = (contentType: string | null) =>
  contentType?.startsWith('image/') ?? false;

const fetchImage = async (url: string, res: NextApiResponse) => {
  const response = await fetch(url);
  const isImage = isImageContent(response.headers.get('content-type'));

  if (isImage) {
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', response.headers.get('content-type') || '');
    res.send(Buffer.from(buffer));
    return true;
  }

  return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, logo } = req.query;

  if (typeof url !== 'string' || typeof logo !== 'string') {
    res.status(400).json({ error: 'Invalid Params' });
    return;
  }

  try {
    // Try directly fetching logo param as image src
    const isLogoImage = await fetchImage(logo, res);
    if (isLogoImage) return;

    // Try fetching google favicon using logo param
    const isGoogleLogoImage = await fetchImage(getGoogleLogoUrl(logo), res);
    if (isGoogleLogoImage) return;

    // Fetch google favicon using url param
    await fetchImage(getGoogleLogoUrl(url), res);
  } catch {
    res.status(500).json({ error: 'Error fetching image' });
  }
};

export default handler;
