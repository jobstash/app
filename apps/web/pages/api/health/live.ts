import type { NextApiRequest, NextApiResponse } from 'next';

import { sendHealth } from '../../../lib/health-response';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const startedAt = Date.now();
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).end();
    return;
  }

  sendHealth(response, 'live', startedAt, {});
}
