import { memo } from 'react';

import { HamburgerIcon } from '@jobstash/shared/ui';
import { MobileMenuButton } from '@jobstash/sidebar/ui';

import RightPanelBackButton from './right-panel-back-button';

interface Props {
  backURL: string;
}

const RightPanelMobileNav = ({ backURL }: Props) => (
  <div className="flex justify-between pb-6 lg:hidden">
    <RightPanelBackButton backURL={backURL} />
    <MobileMenuButton>
      <HamburgerIcon />
    </MobileMenuButton>
  </div>
);

export default memo(RightPanelMobileNav);
