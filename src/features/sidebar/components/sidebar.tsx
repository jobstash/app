import { useRouter } from 'next/router';

import NProgress from 'nprogress';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { useWalletAuthContext } from '~/features/auth/hooks';
import {
  Bartab,
  Brand,
  ConnectWalletButton,
  JobsSidebarIcon,
  Text,
} from '~/shared/components';

export const SideBar = () => {
  const { asPath, push } = useRouter();
  const { role } = useWalletAuthContext();

  return (
    <nav className="fixed left-0 z-50 flex h-[65px] w-full flex-col bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:border-r lg:border-white/5 lg:bg-transparent">
      <div
        className="lg:p-4 lg:pl-1"
        onClick={() => {
          push('/', undefined, { shallow: true });
          NProgress.start();
        }}
      >
        <Brand />
      </div>
      <div>
        <div className="mt-12 hidden lg:block">
          <Text color="dimmed">Discover</Text>
          <div className="space-y-3 pt-3">
            <Bartab
              isActive={asPath.slice(0, 5) === '/jobs'}
              left={<JobsSidebarIcon />}
              text="Jobs"
              onClick={() => push('/jobs')}
            />
          </div>
        </div>
      </div>

      <div className="inset-x-0 bottom-0 hidden space-y-4 p-4 lg:absolute lg:block">
        {role === CHECK_WALLET_ROLES.ADMIN && (
          <div>
            <div className="mt-12 hidden lg:block">
              <Text color="dimmed">Admin Tasks</Text>
              <div className="space-y-3 pt-3">
                <Bartab
                  isActive={asPath.includes('/godmode/technologies')}
                  left={null}
                  text="Technologies"
                  onClick={() => push('/godmode/technologies/synonyms')}
                />
              </div>
            </div>
          </div>
        )}

        <hr className="border-t border-white/20" />

        <ConnectWalletButton />
      </div>
    </nav>
  );
};
