import { memo } from 'react';

import { HamburgerIcon } from '@jobstash/shared/ui';
import { MobileMenuButton } from '@jobstash/sidebar/ui';

import RightPanelBackButton from './right-panel-back-button';

const RightPanelHeaderMobile = () => (
  <div className="flex justify-between pb-6 lg:hidden">
    <RightPanelBackButton />
    <MobileMenuButton>
      <HamburgerIcon />
    </MobileMenuButton>
  </div>
);

export default memo(RightPanelHeaderMobile);
