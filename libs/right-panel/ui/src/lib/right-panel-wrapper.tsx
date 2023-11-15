import { memo, type ReactNode, useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

export const ID_TOP_RIGHT_PANEL = 'top-right-panel';

interface Props {
  children: ReactNode;
}

const RightPanelWrapper = ({ children }: Props) => {
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector('#' + ID_TOP_RIGHT_PANEL);
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
      <div className="absolute top-0 h-0" id={ID_TOP_RIGHT_PANEL} />
      {/* <div className={cn('flex flex-col gap-8 pb-24')}>{children}</div> */}

      <div
        className={cn('flex flex-col gap-8 pb-24', {
          'pt-8': isOpenTopBanner,
        })}
      >
        {children}
      </div>
    </>
  );
};

export default memo(RightPanelWrapper);
