import { useRouter } from 'next/router';

import type { RouteSegments } from '~/shared/core/interfaces';
import type { RouterPush, RouteSection, RouteTab } from '~/shared/core/types';

export const useRouteSegments = () => {
  const router = useRouter();
  const { key, tab } = router.query as {
    key: string;
    tab: RouteTab;
  };

  const pathname = router.asPath;
  const section = pathname.slice(1).split('/')[0] as RouteSection;

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
    key,
    tab,
  };

  return {
    segments,
    push,
  };
};
