import { useRouter } from 'next/router';
import { useEffect } from 'react';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import NProgress from 'nprogress';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { useWalletAuthContext } from '~/features/auth/hooks';
import {
  Bartab,
  Brand,
  Button,
  CloseIcon,
  JobsSidebarIcon,
  MobileMenuButton,
  Text,
} from '~/shared/components';

import { navbarOpenAtom } from '../atoms';

export const SideBar = () => {
  const { asPath, push } = useRouter();
  const { role } = useWalletAuthContext();

  const [navbarOpen, setNavbarOpen] = useAtom(navbarOpenAtom);

  useEffect(() => {
    const el = document.querySelectorAll('html')[0];
    if (navbarOpen) {
      el.classList.add('disable-scroll');
    } else {
      el.classList.remove('disable-scroll');
    }
  }, [navbarOpen]);

  return (
    <nav
      className={clsx(
        'fixed left-0 z-50 flex h-[65px] w-full justify-between bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:flex-col lg:justify-start lg:border-r lg:border-white/5 lg:bg-transparent',
        { 'z-[100]': navbarOpen },
      )}
    >
      <div
        className="lg:p-4 lg:pl-1"
        onClick={() => {
          push('/jobs', undefined, { shallow: true });
          NProgress.start();
        }}
      >
        <Brand />
      </div>
      <nav
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className={clsx(
          'inset-0 w-full bg-opacity-75 bg-gradient-to-r from-quinary from-20% to-primary p-4 transition-all duration-300 lg:hidden',
          { 'z-50 opacity-100 fixed overflow-auto h-screen': navbarOpen },
          { 'opacity-0 -z-50 absolute h-0 overflow-hidden': !navbarOpen },
        )}
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
        <br />
        <div className="inline-flex space-y-3 pt-3 [&>*]:bg-transparent  [&>*]:bg-none [&>*]:hover:bg-transparent">
          <Bartab
            isActive={asPath.slice(0, 5) === '/jobs'}
            onClick={() => {
              push('/jobs');
              setNavbarOpen(!navbarOpen);
            }}
          >
            <span className="text-2xl text-white">Jobs</span>
          </Bartab>
        </div>
      </nav>

      <MobileMenuButton />

      <div>
        <div className="mt-12 hidden lg:block">
          <Text color="dimmed">Discover</Text>
          <div className="space-y-3 pt-3">
            <Bartab
              isActive={asPath.slice(0, 5) === '/jobs'}
              left={<JobsSidebarIcon />}
              onClick={() => push('/jobs')}
            >
              Jobs
            </Bartab>
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
                  onClick={() => push('/godmode/technologies/synonyms')}
                >
                  Technologies
                </Bartab>
                <Bartab
                  isActive={asPath.includes('/godmode/organizations')}
                  left={null}
                  onClick={() => push('/godmode/organizations')}
                >
                  Organizations
                </Bartab>
              </div>
            </div>
          </div>
        )}

        {/* <hr className="border-t border-white/20" />

        <ConnectWalletButton /> */}
      </div>
    </nav>
  );
};
