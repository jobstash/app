import { ECOSYSTEM_HEADER_KEY } from '@jobstash/shared/core';

import { getEcosystemSubdomain } from './get-ecosystem-subdomain';

export const getEcosystemHeader = () => {
  if (typeof window !== 'undefined') {
    const { isSupported, subdomain } = getEcosystemSubdomain();
    if (isSupported) return { [ECOSYSTEM_HEADER_KEY]: subdomain };
  }
};