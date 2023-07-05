import { memo } from 'react';

import { RouteSection } from '@jobstash/shared/core';

import { HamburgerIcon } from '@jobstash/shared/ui';
import { MobileMenuButton } from '@jobstash/sidebar/ui';

import RightPanelBackButton from './right-panel-back-button';

interface Props {
  routeSection: RouteSection;
}

const RightPanelHeaderMobile = ({ routeSection }: Props) => (
  <div className="flex justify-between pb-6 lg:hidden">
    <RightPanelBackButton routeSection={routeSection} />
    <MobileMenuButton>
      <HamburgerIcon />
    </MobileMenuButton>
  </div>
);

export default memo(RightPanelHeaderMobile);
