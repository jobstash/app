import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { useWalletAuthContext } from '~/features/auth/hooks';
import { Brand, ConnectWalletButton } from '~/shared/components';

import {
  bookmarkBartabs,
  discoverBartabs,
  roleSectionMap,
} from '../core/constants';

import { SidebarSection } from './sidebar-section';

export const SideBar = () => {
  const { role } = useWalletAuthContext();

  const roleSection = roleSectionMap[role];

  return (
    <nav className="fixed left-0 z-50 flex h-[65px] w-full flex-col bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:border-r lg:border-white/5 lg:bg-transparent">
      <div className="lg:p-4 lg:pl-1">
        <Brand />
      </div>
      <div>
        <SidebarSection
          title="Discover"
          tabs={discoverBartabs}
          isActiveFn={({ tab: { label }, segments: { section } }) =>
            `${section}` === `${label.toLowerCase()}`
          }
        />
      </div>
      {role === CHECK_WALLET_ROLES.DEV && (
        <div>
          <SidebarSection
            title="Bookmarked"
            tabs={bookmarkBartabs}
            isActiveFn={() => false}
          />
        </div>
      )}
      <div className="inset-x-0 bottom-0 hidden space-y-4 p-4 lg:absolute lg:block">
        {roleSection ? (
          <SidebarSection
            title={roleSection.title}
            tabs={roleSection.tabs}
            isActiveFn={roleSection.isActiveFn}
          />
        ) : null}

        <hr className="border-t border-white/20" />

        <ConnectWalletButton />
      </div>
    </nav>
  );
};
