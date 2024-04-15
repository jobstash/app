import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import { isDisabledPageScrollAtom } from '../atoms/is-disabled-page-scroll-atom';

import { useIsMounted } from './use-is-mounted';
import { useIsDesktop } from './use-media-query';

interface Props {
  shouldDisable: boolean;
}

/**
 * Disables page-scroll for non-desktop devices based on `shouldDisable` prop.
 * Fullscreen overlays often have scroll issues on elements behind.
 * Should be used in RightPanel
 */
export const usePageScrollDisableSyncer = ({ shouldDisable }: Props) => {
  const isMounted = useIsMounted();
  const isDesktop = useIsDesktop();
  const [isDisabled, setIsDisabled] = useAtom(isDisabledPageScrollAtom);

  useEffect(() => {
    if (isMounted && !isDesktop && isDisabled !== shouldDisable) {
      setIsDisabled(shouldDisable);
    }
  }, [isDesktop, isDisabled, isMounted, setIsDisabled, shouldDisable]);

  // Fix scroll disabled on resize (re-enable scroll on large devices)
  const checkOnResize = useCallback(() => {
    if (window.innerWidth >= DETAILS_BREAKPOINT && isDisabled) {
      setIsDisabled(false);
    }
  }, [isDisabled, setIsDisabled]);

  useEffect(() => {
    // Invoke check on init
    checkOnResize();

    window.addEventListener('resize', checkOnResize);

    return () => window.removeEventListener('resize', checkOnResize);
  }, [checkOnResize]);

  return null;
};

const DETAILS_BREAKPOINT = 1024;
