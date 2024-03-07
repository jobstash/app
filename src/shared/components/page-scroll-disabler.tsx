'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { isDisabledPageScrollAtom } from '~/shared/atoms/is-disabled-page-scroll-atom';
import { showFullscreenNavAtom } from '~/shared/atoms/show-fullscreen-nav-atom';

/**
 * Disables page-scroll if either `isDisabledPageScrollAtom` or `showFullscreenNavAtom` is `true`.
 * Should be included in root layout.
 */
export const PageScrollDisabler = () => {
  const pathname = usePathname();
  const isWhitelisted = whitelistSet.has(pathname);

  const isOpenNav = useAtomValue(showFullscreenNavAtom);
  const isDisabled = useAtomValue(isDisabledPageScrollAtom);

  const shouldDisable = isOpenNav || (isDisabled && !isWhitelisted);

  useEffect(() => {
    const el = document.querySelectorAll('html')[0];
    el.style.overflow = shouldDisable ? 'hidden' : 'unset';
  }, [shouldDisable]);

  return null;
};

const whitelist = ['/jobs', '/organizations', '/projects'];

const whitelistSet = new Set(whitelist);
