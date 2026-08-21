import type { NextApiResponse } from 'next';

export type Dependency = {
  status: 'up' | 'down';
  responseTimeMs: number;
};

export const sendHealth = (
  response: NextApiResponse,
  status: 'live' | 'ready' | 'not_ready',
  startedAt: number,
  dependencies: Record<string, Dependency>,
) => {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.status(status === 'not_ready' ? 503 : 200).json({
    status,
    service: 'jobstash-legacy-webapp',
    environment: process.env.APP_ENV ?? process.env.NODE_ENV ?? 'unknown',
    releaseSha: process.env.RELEASE_SHA ?? 'unknown',
    imageDigest: process.env.IMAGE_DIGEST ?? 'unknown',
    buildTime: process.env.BUILD_TIME ?? 'unknown',
    responseTimeMs: Date.now() - startedAt,
    instanceRole: process.env.INSTANCE_ROLE ?? 'frontend-bff',
    dependencies,
  });
};
