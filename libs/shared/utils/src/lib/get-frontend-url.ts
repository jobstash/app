import { FRONTEND_URL } from '@jobstash/shared/core';

import { getEcosystemSubdomain } from './get-ecosystem-subdomain';

export const getFrontendUrl = () => {
  const { subdomain, isSupported } = getEcosystemSubdomain();

  // Return as usual if subdomain is not supported, or instance is not deployed
  if (!isSupported || FRONTEND_URL.includes(HOSTNAME)) return FRONTEND_URL;

  return `https://${subdomain}.${HOSTNAME}`;
};

const HOSTNAME = 'jobstash.xyz';
