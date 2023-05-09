import { useRouter } from 'next/router';
import { useState } from 'react';

import NProgress from 'nprogress';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { useWalletAuthContext } from '~/features/auth/hooks';
import {
  Bartab,
  Brand,
  Button,
  CloseIcon,
  ConnectWalletButton,
  HamburgerIcon,
  JobsSidebarIcon,
  Text,
} from '~/shared/components';

export const SideBar = () => {
  const { asPath, push } = useRouter();
  const { role } = useWalletAuthContext();

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed left-0 z-50 flex h-[65px] w-full justify-between bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:flex-col lg:justify-start lg:border-r lg:border-white/5 lg:bg-transparent">
      <div
        className="lg:p-4 lg:pl-1"
        onClick={() => {
          push('/', undefined, { shallow: true });
          NProgress.start();
        }}
      >
        <Brand />
      </div>
      <nav
        className={
          'w-full transition-all duration-300 inset-0  p-4 bg-gradient-to-r from-tertiary to-primary bg-opacity-75' +
          (navbarOpen
            ? ' z-50 opacity-100 fixed overflow-auto h-screen'
            : ' opacity-0 -z-50 absolute h-0 overflow-hidden')
        }
      >
        <div className="flex justify-between">
          <Brand />
          <Button
            size="sm"
            variant="transparent"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <CloseIcon />
          </Button>
        </div>
        <Text color="dimmed" className="block pt-8">
          Discover
        </Text>
        <div className="space-y-3 pt-3">
          <Bartab
            isActive={asPath.slice(0, 5) === '/jobs'}
            text="Jobs"
            onClick={() => {
              push('/jobs');
              setNavbarOpen(!navbarOpen);
            }}
          />
        </div>
      </nav>
      <div className="-mr-2 ml-auto self-center lg:hidden">
        <Button
          size="md"
          variant="transparent"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <HamburgerIcon />
        </Button>
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
                <Bartab
                  isActive={asPath.includes('/godmode/organizations')}
                  left={null}
                  text="Organizations"
                  onClick={() => push('/godmode/organizations')}
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
