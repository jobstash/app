import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { disablePageScroll } from '@jobstash/shared/utils';

import { isDisabledPageScrollAtom } from '../atoms/is-disabled-page-scroll-atom';
import { isOpenFullscreenNavAtom } from '../atoms/is-open-fullscreen-nav-atom';

// Used for appending `disable-scroll` class to html
export const useDisableScrollListener = () => {
  const { pathname } = useRouter();
  const isWhitelisted = whitelistSet.has(pathname);

  const isOpenNav = useAtomValue(isOpenFullscreenNavAtom);
  const isDisabled = useAtomValue(isDisabledPageScrollAtom);

  const shouldDisable = isOpenNav || (isDisabled && !isWhitelisted);

  useEffect(() => {
    disablePageScroll(shouldDisable);
  }, [shouldDisable]);
};

const whitelist = ['/jobs', '/organizations', '/projects'];
const whitelistSet = new Set(whitelist);
