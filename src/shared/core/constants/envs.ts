import getConfig from 'next/config';

const {
  publicRuntimeConfig: { publicEnvs },
} = getConfig();

export const {
  NEXT_PUBLIC_MW_URL,
  NEXT_PUBLIC_PAGE_SIZE,
  NEXT_PUBLIC_QUERY_RETRY_COUNT,
} = publicEnvs;
