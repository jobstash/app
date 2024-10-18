import { COMMUNITY_HEADER_KEY } from '@jobstash/shared/core';

import { getCommunitySubdomain } from './get-ecosystem-subdomain';

export const getCommunityHeader = (ssrHost?: string) => {
  const { isSupported, subdomain } = getCommunitySubdomain(ssrHost);
  if (isSupported) return { [COMMUNITY_HEADER_KEY]: subdomain };
};
