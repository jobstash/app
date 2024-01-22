import { useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import { disablePageScroll } from '@jobstash/shared/utils';

import { mobileRightPanelOpenAtom } from '../atoms/mobile-right-panel-open-atom';

import { useIsMobile } from './use-is-mobile';

/**
 * SSR to details page (on mobile) does not disable page scroll by default
 * This hook syncs the page-scroll disable
 */
export const useMobileDetailsScrollSyncer = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useAtom(mobileRightPanelOpenAtom);
  const initRef = useRef(false);

  useEffect(() => {
    if (isMobile && !initRef.current) {
      initRef.current = true;
      if (!isOpen) {
        disablePageScroll(true);
        setIsOpen(true);
      }
    }
  }, [isMobile, isOpen, setIsOpen]);
};
