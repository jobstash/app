import { type ReactNode } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';

import { HamburgerIcon } from '@jobstash/shared/ui';
import { MobileMenuButton } from '@jobstash/sidebar/ui';

import RightPanelHeader from './right-panel-header';
import RightPanelWrapper from './right-panel-wrapper';

interface Props {
  org: RightPanelOrg | null;
  tabs: ReactNode;
  children: ReactNode;
  backButton: ReactNode;
  hideMenu?: boolean;
}

const RightPanel = ({ org, tabs, children, backButton, hideMenu }: Props) => (
  <RightPanelWrapper>
    {/* MOBILE NAV */}
    <div className="flex justify-between items-center lg:hidden">
      {backButton}
      {!hideMenu && (
        <MobileMenuButton>
          <HamburgerIcon />
        </MobileMenuButton>
      )}
    </div>

    {org && <RightPanelHeader org={org} />}

    {org && tabs && <hr className="border-t border-white/10 -my-2" />}

    {tabs}

    {children}
  </RightPanelWrapper>
);

export default RightPanel;
