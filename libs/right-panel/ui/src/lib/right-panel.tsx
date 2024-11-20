import { type ReactNode } from 'react';

import { HamburgerIcon } from '@jobstash/shared/ui';
import { MobileMenuButton } from '@jobstash/sidebar/ui';

import RightPanelWrapper from './right-panel-wrapper';

interface Props {
  header: ReactNode;
  tabs: ReactNode;
  children: ReactNode;
  backButton: ReactNode;
  hideMenu?: boolean;
}

const RightPanel = ({
  header,
  tabs,
  children,
  backButton,
  hideMenu,
}: Props) => (
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

    {header}

    {tabs && <hr className="border-t border-white/10 -my-2" />}

    {tabs}

    {children}
  </RightPanelWrapper>
);

export default RightPanel;
