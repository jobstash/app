import { MEDIA_QUERY_MOBILE } from '@jobstash/shared/core';

import { useMediaQuery } from './use-media-query';

export const useIsMobile = (mediaQuery?: string) =>
  useMediaQuery(mediaQuery ?? MEDIA_QUERY_MOBILE, true);
