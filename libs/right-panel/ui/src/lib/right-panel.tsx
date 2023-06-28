import { memo, type ReactNode, useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { type RightPanelOrg } from '@jobstash/right-panel/core';

import { mobileRightPanelOpenAtom } from '@jobstash/shared/state';

import RightPanelHeader from './right-panel-header';
import RightPanelHeaderMobile from './right-panel-header-mobile';
import RightPanelWrapper from './right-panel-wrapper';

interface Props {
  org: RightPanelOrg;
  tabs: ReactNode;
  children: ReactNode;
}

const RightPanel = ({ org, tabs, children }: Props) => {
  // Disable main window scroll when mobile right-panel is open
  const mobileRightPanelOpenValue = useAtomValue(mobileRightPanelOpenAtom);
  useEffect(() => {
    const el = document.querySelectorAll('html')[0];
    if (mobileRightPanelOpenValue) {
      el.classList.add('disable-scroll');
    } else {
      el.classList.remove('disable-scroll');
    }
  }, [mobileRightPanelOpenValue]);

  return (
    <RightPanelWrapper>
      <RightPanelHeaderMobile />
      <RightPanelHeader org={org} />
      {tabs}
      {children}
    </RightPanelWrapper>
  );
};

export default memo(RightPanel);
