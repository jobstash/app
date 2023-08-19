import { memo } from 'react';

import { SidebarProvider } from '@jobstash/sidebar/state';

import {
  CloseIcon,
  HamburgerIcon,
  IsMountedWrapper,
  Text,
} from '@jobstash/shared/ui';
import {
  Brand,
  MobileMenuButton,
  MobileNavbarWrapper,
  SidebarBookmarksSection,
  SidebarCloseButton,
  SidebarDiscoverBartabs,
  SidebarUserSection,
  SidebarWrapper,
} from '@jobstash/sidebar/ui';
import { ConnectWalletButton } from '@jobstash/auth/feature';

const Sidebar = () => (
  <SidebarProvider>
    <SidebarWrapper>
      <Brand />

      {/* MOBILE BARTABS */}
      <MobileNavbarWrapper>
        <div className="flex justify-between">
          <Brand />
          <SidebarCloseButton>
            <CloseIcon />
          </SidebarCloseButton>
        </div>

        <Text color="dimmed" className="block pt-8">
          Discover
        </Text>

        <SidebarDiscoverBartabs isMobile />
      </MobileNavbarWrapper>
      <div className="-mr-2 ml-auto self-center lg:hidden">
        <MobileMenuButton>
          <HamburgerIcon />
        </MobileMenuButton>
      </div>

      {/* DESKTOP BARTABS */}
      <div className="mt-12 hidden lg:flex flex-col space-y-8">
        <div className="flex-col">
          <Text color="dimmed">Discover</Text>
          <SidebarDiscoverBartabs />
        </div>

        <SidebarBookmarksSection />
      </div>

      {/* BOTTOM BARTABS */}
      <div className="inset-x-0 bottom-0 hidden space-y-4 p-4 lg:absolute lg:block">
        <IsMountedWrapper>
          <SidebarUserSection />
        </IsMountedWrapper>
        <hr className="border-t border-white/20" />
        <ConnectWalletButton />
      </div>
    </SidebarWrapper>
  </SidebarProvider>
);

export default memo(Sidebar);
