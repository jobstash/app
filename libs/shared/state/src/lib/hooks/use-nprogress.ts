import { useRouter } from 'next/router';

import NProgress from 'nprogress';

const nProgressExcludedPathnames = new Set([
  '/jobs/[slug]/[tab]',
  '/organizations/[slug]/[tab]',
  '/projects/[slug]/[tab]',
]);

const nProgressStopExcludePathnames = new Set(['/pick-role']);

export const useNProgress = () => {
  const { pathname } = useRouter();

  const shouldDisplay = !nProgressExcludedPathnames.has(pathname);

  const startNProgress = (forceStart = false) => {
    if (forceStart || shouldDisplay) {
      NProgress.start();
    }
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const stopNProgress = (forceStop = false, url?: string) => {
    const canStop = url ? !nProgressStopExcludePathnames.has(url) : true;

    if (forceStop || canStop) {
      NProgress.done();
    }
  };

  return {
    startNProgress,
    stopNProgress,
  };
};
