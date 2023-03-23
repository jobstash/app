import { Brand, ConnectWalletButton } from '~/shared/components';

import {
  bookmarkBartabs,
  devBarTabs,
  discoverBartabs,
} from '../core/constants';

import { SidebarSection } from './sidebar-section';

export const SideBar = () => (
  <nav className="fixed inset-y-0 left-0 flex min-h-screen w-52 flex-col border-r border-white/5 p-4">
    <div className="p-4 pl-1">
      <Brand />
    </div>
    <div>
      <SidebarSection
        title="Discover"
        tabs={discoverBartabs}
        isActiveFn={({ icon }, { section }) => `${section}` === `${icon}`}
      />
    </div>
    <div>
      <SidebarSection
        title="Bookmarked"
        tabs={bookmarkBartabs}
        isActiveFn={() => false}
      />
    </div>
    <div className="absolute inset-x-0 bottom-0 space-y-4 p-4">
      <SidebarSection
        title="Your Profile"
        tabs={devBarTabs}
        isActiveFn={() => false}
      />

      <hr className="border-t border-white/20" />

      <ConnectWalletButton />
    </div>
  </nav>
);
