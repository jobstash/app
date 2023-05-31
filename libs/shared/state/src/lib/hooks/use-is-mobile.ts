import { MEDIA_QUERY_MOBILE } from '@jobstash/shared/core';

import { useMediaQuery } from './use-media-query';

export const useIsMobile = () => useMediaQuery(MEDIA_QUERY_MOBILE, true);
