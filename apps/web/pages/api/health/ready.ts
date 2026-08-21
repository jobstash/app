import type { NextApiRequest, NextApiResponse } from 'next';

import {
  type Dependency,
  sendHealth,
} from '../../../lib/health-response';

const probe = async (url: string): Promise<Dependency> => {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(1_500),
    });
    return {
      status: response.ok ? 'up' : 'down',
      responseTimeMs: Date.now() - startedAt,
    };
  } catch {
    return { status: 'down', responseTimeMs: Date.now() - startedAt };
  }
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const startedAt = Date.now();
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).end();
    return;
  }

  const middlewareUrl = process.env.NEXT_PUBLIC_MW_URL;
  const configuration: Dependency = {
    status:
      middlewareUrl && process.env.NEXT_PUBLIC_FRONTEND_URL ? 'up' : 'down',
    responseTimeMs: 0,
  };
  const middleware = middlewareUrl
    ? await probe(new URL('/health/ready', middlewareUrl).toString())
    : { status: 'down' as const, responseTimeMs: 0 };
  const dependencies = { configuration, middleware };
  const ready = Object.values(dependencies).every(
    (dependency) => dependency.status === 'up',
  );

  sendHealth(
    response,
    ready ? 'ready' : 'not_ready',
    startedAt,
    dependencies,
  );
}
