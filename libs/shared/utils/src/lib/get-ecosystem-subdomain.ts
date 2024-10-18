/* eslint-disable @typescript-eslint/no-explicit-any */
import { COMMUNITY_SET } from '@jobstash/shared/core';

export const getCommunitySubdomain = (ssrHost?: string) => {
  const isSSR = typeof window === 'undefined';
  const host = isSSR ? ssrHost : window.location.hostname;

  return getSupportedSubdomain(host);
};

const getSupportedSubdomain = (host?: string) => {
  if (!host) return { isSupported: false, subdomain: '' };

  const subdomain = host.split('.')[0];
  const isSupported = COMMUNITY_SET.has(subdomain as any);

  return { isSupported, subdomain };
};
