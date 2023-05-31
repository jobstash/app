import { useRouter } from 'next/router';
import { memo, type ReactNode, useEffect } from 'react';

import { EVENT_CARD_CLICK } from '@jobstash/shared/core';

export const ID_TOP_RIGHT_PANEL = 'top-right-panel';

interface Props {
  children: ReactNode;
}

const RightPanelWrapper = ({ children }: Props) => {
  const { pathname } = useRouter();

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

  // Don't show right-panel on /jobs route
  if (pathname === '/jobs') return null;

  return (
    <>
      <div className="absolute top-0 h-0" id={ID_TOP_RIGHT_PANEL} />
      <div className="flex flex-col gap-8">{children}</div>
    </>
  );
};

export default memo(RightPanelWrapper);