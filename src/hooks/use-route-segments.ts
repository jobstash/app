import { useRouter } from 'next/router';

import type { RouteSegments } from '~/core/interfaces';
import type { RouterPush } from '~/core/types';

/**
 * `useRouteSegment` returns info needed for routes involving `/{section}/{org}-{job-title}`
 */
export const useRouteSegments = () => {
  const router = useRouter();
  const { id, tab } = router.query as {
    id: string;
    tab: RouteSegments['tab'];
  };

  const pathname = router.asPath;
  const section = pathname.slice(1).split('/')[0] as RouteSegments['section'];

  const push: RouterPush = (url, options) => {
    // * Need pathname guard since nextjs throws runtime error on router.push to same url
    // * Need window guard since this might also run in server
    if (url !== pathname && typeof window !== 'undefined')
      router.push(url, undefined, {
        scroll: options?.shouldScroll,
        shallow: options?.shallow,
      });
  };

  const segments: RouteSegments = {
    section,
    id,
    tab,
  };

  return {
    segments,
    push,
  };
};
