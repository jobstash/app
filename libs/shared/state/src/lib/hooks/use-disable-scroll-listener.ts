import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { disablePageScroll } from '@jobstash/shared/utils';

import { mobileRightPanelOpenAtom } from '../atoms/mobile-right-panel-open-atom';

// Used for appending `disable-scroll` class to html
export const useDisableScrollListener = () => {
  // Disable main window scroll when mobile right-panel is open
  const mobileRightPanelOpenValue = useAtomValue(mobileRightPanelOpenAtom);

  useEffect(() => {
    disablePageScroll(mobileRightPanelOpenValue);
  }, [mobileRightPanelOpenValue]);
};
