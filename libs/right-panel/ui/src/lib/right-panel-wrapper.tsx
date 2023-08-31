import { memo, type ReactNode, useEffect } from 'react';

import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

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

  return (
    <>
      <div className="absolute top-0 h-0" id={ID_TOP_RIGHT_PANEL} />
      <div
        className={cn('flex flex-col gap-8 pb-24', {
          // 'mt-4 sm:mt-0 pt-10': true, // Only when top-banner is visible
        })}
      >
        {children}
      </div>
    </>
  );
};

export default memo(RightPanelWrapper);
