/* eslint-disable @typescript-eslint/no-explicit-any */
import { ECOSYSTEMS_SET } from '@jobstash/shared/core';

export const getEcosystemSubdomain = () => {
  const subdomain = window.location.hostname.split('.')[0];
  const isSupported = ECOSYSTEMS_SET.has(subdomain as any);

  return { isSupported, subdomain };
};
