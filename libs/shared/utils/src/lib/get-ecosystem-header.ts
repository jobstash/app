import { ECOSYSTEM_HEADER_KEY } from '@jobstash/shared/core';

import { getEcosystemSubdomain } from './get-ecosystem-subdomain';

export const getEcosystemHeader = (ssrHost?: string) => {
  const { isSupported, subdomain } = getEcosystemSubdomain(ssrHost);
  if (isSupported) return { [ECOSYSTEM_HEADER_KEY]: subdomain };
};
