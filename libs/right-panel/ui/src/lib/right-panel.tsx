import { type ReactNode } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';

import { HamburgerIcon } from '@jobstash/shared/ui';
import { MobileMenuButton } from '@jobstash/sidebar/ui';

import RightPanelHeader from './right-panel-header';
import RightPanelWrapper from './right-panel-wrapper';

interface Props {
  org: RightPanelOrg;
  tabs: ReactNode;
  children: ReactNode;
  backButton: ReactNode;
}

const RightPanel = ({ org, tabs, children, backButton }: Props) => (
  <RightPanelWrapper>
    {/* MOBILE NAV */}
    <div className="flex justify-between items-center lg:hidden">
      {backButton}
      <MobileMenuButton>
        <HamburgerIcon />
      </MobileMenuButton>
    </div>

    <RightPanelHeader org={org} />
    {tabs}
    {children}
  </RightPanelWrapper>
);

export default RightPanel;
