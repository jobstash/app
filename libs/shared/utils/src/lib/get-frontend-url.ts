import { Ecosystem, ECOSYSTEMS_SET, FRONTEND_URL } from '@jobstash/shared/core';

import { getEcosystemSubdomain } from './get-ecosystem-subdomain';

const JOBSTASH_HOSTNAME = 'jobstash.xyz';

export const getFrontendUrl = () => {
  const { subdomain, isSupported } = getEcosystemSubdomain();

  // Return as usual if subdomain is not supported, or instance is not deployed
  if (!isSupported || !FRONTEND_URL.includes(JOBSTASH_HOSTNAME))
    return FRONTEND_URL;

  return `https://${subdomain}.${JOBSTASH_HOSTNAME}`;
};

export const getFrontendUrlSSR = (host?: string) => {
  if (!host) return FRONTEND_URL;

  const isJobstash = host.toLowerCase().includes(JOBSTASH_HOSTNAME);
  const parts = host.split('.');

  if (!isJobstash) return FRONTEND_URL;
  if (parts.length < 3) return FRONTEND_URL;

  const subdomain = parts.slice(0, -2).join('.');
  const isSupported = ECOSYSTEMS_SET.has(subdomain as Ecosystem);

  if (!isSupported) return FRONTEND_URL;

  return `https://${subdomain}.${JOBSTASH_HOSTNAME}`;
};
