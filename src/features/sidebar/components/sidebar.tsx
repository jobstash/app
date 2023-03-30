import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { useWalletAuthContext } from '~/features/auth/hooks';
import { Brand, ConnectWalletButton } from '~/shared/components';
import { useIsMounted } from '~/shared/hooks';

import {
  bookmarkBartabs,
  discoverBartabs,
  roleSectionMap,
} from '../core/constants';

import { SidebarSection } from './sidebar-section';

export const SideBar = () => {
  const isMounted = useIsMounted();
  const { role } = useWalletAuthContext();

  const roleSection = roleSectionMap[role];

  if (!isMounted) return null;

  return (
    <nav className="fixed inset-y-0 left-0 flex min-h-screen w-52 flex-col border-r border-white/5 p-4">
      <div className="p-4 pl-1">
        <Brand />
      </div>
      <div>
        <SidebarSection
          title="Discover"
          tabs={discoverBartabs}
          isActiveFn={({ tab: { icon }, segments: { section } }) =>
            `${section}` === `${icon}`
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
      <div className="absolute inset-x-0 bottom-0 space-y-4 p-4">
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
