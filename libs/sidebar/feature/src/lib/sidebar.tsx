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
  FollowTelegramButton,
  MobileMenuButton,
  MobileNavbarWrapper,
  RequestToBeListedButton,
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
      <div className='lg:z-[999] lg:w-screen lg:fixed lg:top-0 lg:left-0 lg:px-4 lg:bg-gradient-to-l lg:from-[#141317] lg:to-[#121216] lg:border-b lg:border-white/5 lg:h-20 lg:flex lg:items-center lg:justify-between'>
        <Brand /> 
        <div className="hidden space-x-4 p-4 lg:flex">
          <IsMountedWrapper>
            <RequestToBeListedButton />
          </IsMountedWrapper>
          <FollowTelegramButton />
          <hr className="border-t border-white/20" />
          <ConnectWalletButton />
        </div>
      </div>
      {/* MOBILE BARTABS */}
      <MobileNavbarWrapper>
        <div className="flex justify-between pb-4 -mr-2">
          <Brand />
          <SidebarCloseButton>
            <CloseIcon />
          </SidebarCloseButton>
        </div>

        <div className="flex flex-col">
          <Text color="dimmed" className="block">
            Discover
          </Text>
          <SidebarDiscoverBartabs isMobile />
        </div>

        <SidebarBookmarksSection isMobile />

        <IsMountedWrapper>
          <SidebarUserSection isMobile />
        </IsMountedWrapper>

        <div className="grow" />

        {/* MOBILE BOTTOM BARTABS */}
        <div className="inset-x-0 bottom-0 space-y-4 p-4 lg:relative lg:hidden flex flex-col">
          <IsMountedWrapper>
            <RequestToBeListedButton isMobile />
          </IsMountedWrapper>
          <FollowTelegramButton isMobile />
          <hr className="border-t border-white/20" />
          <ConnectWalletButton isMobile />
        </div>
      </MobileNavbarWrapper>
      <div className="-mr-4 ml-auto lg:hidden">
        <MobileMenuButton>
          <HamburgerIcon />
        </MobileMenuButton>
      </div>

      {/* DESKTOP BARTABS */}
      <div className="mt-24 hidden lg:flex flex-col space-y-6">
        <div className="flex-col">
          <Text color="dimmed">Discover</Text>
          <SidebarDiscoverBartabs />
        </div>

        <SidebarBookmarksSection />

        <IsMountedWrapper>
          <SidebarUserSection />
        </IsMountedWrapper>
      </div>

      
      
    </SidebarWrapper>
  </SidebarProvider>
);

export default memo(Sidebar);
