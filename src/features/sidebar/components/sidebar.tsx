import {
  Bartab,
  Brand,
  ConnectWalletButton,
  JobsSidebarIcon,
  Text,
} from '~/shared/components';

export const SideBar = () => (
  <nav className="fixed left-0 z-50 flex h-[65px] w-full flex-col bg-gradient-to-l from-[#141317] to-[#121216] p-4 lg:inset-y-0 lg:h-auto lg:min-h-screen lg:w-52 lg:border-r lg:border-white/5 lg:bg-transparent">
    <div className="lg:p-4 lg:pl-1">
      <Brand />
    </div>
    <div>
      <div className="mt-12 hidden lg:block">
        <Text color="dimmed">Discover</Text>
        <div className="space-y-3 pt-3">
          <Bartab isActive left={<JobsSidebarIcon />} text="Jobs" />
        </div>
      </div>
    </div>
    <div className="inset-x-0 bottom-0 hidden space-y-4 p-4 lg:absolute lg:block">
      <ConnectWalletButton />
    </div>
  </nav>
);
