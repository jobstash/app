import { memo, type ReactNode, useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';
import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

interface Props {
  children: ReactNode;
}

const RightPanelWrapper = ({ children }: Props) => {
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector(`#${RIGHT_PANEL_WRAPPER_ID}`);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener(EVENT_CARD_CLICK, scrollListener);
    return () => document.removeEventListener(EVENT_CARD_CLICK, scrollListener);
  }, []);

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <>
      <div className="absolute top-0 h-0" />
      {/* <div className={cn('flex flex-col gap-8 pb-24')}>{children}</div> */}

      <div
        className={cn('flex flex-col gap-8 py-8 lg:py-0')}
      >
        {children}
      </div>
    </>
  );
};

export default memo(RightPanelWrapper);
