import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import {
  DUCK_TELEGRAM_URL,
  RouteSection,
  TELEGRAM_URL,
} from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';
import { SidebarProvider } from '@jobstash/sidebar/state';

import {
  CloseIcon,
  HamburgerIcon,
  IsMountedWrapper,
  Text,
} from '@jobstash/shared/ui';
import {
  Brand,
  HeaderLink,
  JoinTalentPool,
  // JoinTalentPool,
  MobileMenuButton,
  MobileNavbarWrapper,
  SidebarBookmarksSection,
  SidebarCloseButton,
  SidebarDiscoverBartabs,
  SidebarUserSection,
  SidebarWrapper,
} from '@jobstash/sidebar/ui';
import { PrivyButton } from '@jobstash/auth/feature';

const Filters = dynamic(() =>
  import('@jobstash/filters/feature').then((m) => m.Filters),
);

const GET_HELP_TEXT = 'Help';
const SUBSCRIBE_TG_TEXT = 'TG Job Feed';
interface Props {
  filtersRouteSection?: RouteSection;
}

const Sidebar = ({ filtersRouteSection }: Props) => {
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <SidebarProvider>
      <SidebarWrapper>
        <div
          className={cn(
            'lg:z-[999] lg:w-screen lg:fixed lg:top-0 lg:left-0 lg:px-4 lg:bg-gradient-to-l lg:from-[#141317] lg:to-[#121216] lg:h-[100px] lg:border-b lg:border-white/5  lg:flex lg:items-center',
            { 'lg:pt-10 lg:h-[140px]': isOpenTopBanner },
          )}
        >
          <div className="lg:w-[191px]">
            <div className="lg:pt-5">
              <Brand />
            </div>
            <div className="items-center w-[165px] gap-x-7 pt-3.5 pb-4 hidden lg:flex">
              <a
                href="https://telegram.me/jobstashxyz"
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:opacity-50"
              >
                <TelegramIcon />
              </a>

              <a
                href="https://twitter.com/jobstash_xyz"
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:opacity-50"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://warpcast.com/~/channel/jobstash"
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:opacity-50"
              >
                <FarcasterIcon />
              </a>
            </div>
          </div>
          {filtersRouteSection && (
            <Filters routeSection={filtersRouteSection} />
          )}
          <div className="items-center hidden space-x-6 lg:flex lg:mr-0 lg:ml-auto lg:pr-4">
            <JoinTalentPool />
            <HeaderLink text={SUBSCRIBE_TG_TEXT} link={TELEGRAM_URL} />
            <HeaderLink text={GET_HELP_TEXT} link={DUCK_TELEGRAM_URL} />
            <PrivyButton />
          </div>
        </div>
        {/* MOBILE BARTABS */}
        <MobileNavbarWrapper>
          <div className="flex justify-between -mr-2">
            <Brand />
            <SidebarCloseButton>
              <CloseIcon />
            </SidebarCloseButton>
          </div>
          <div className="flex -mt-2 gap-x-7">
            <a
              href="https://telegram.me/jobstashxyz"
              target="_blank"
              rel="noreferrer"
              className="transition-all hover:opacity-50"
            >
              <TelegramIcon />
            </a>

            <a
              href="https://twitter.com/jobstash_xyz"
              target="_blank"
              rel="noreferrer"
              className="transition-all hover:opacity-50"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://warpcast.com/~/channel/jobstash"
              target="_blank"
              rel="noreferrer"
              className="transition-all hover:opacity-50"
            >
              <FarcasterIcon />
            </a>
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
          <div className="inset-x-0 bottom-0 flex flex-col p-4 space-y-4 lg:relative lg:hidden">
            <JoinTalentPool isMobile />
            <HeaderLink
              isMobile
              text={GET_HELP_TEXT}
              link={DUCK_TELEGRAM_URL}
            />
            <HeaderLink isMobile text={SUBSCRIBE_TG_TEXT} link={TELEGRAM_URL} />
          </div>
        </MobileNavbarWrapper>
        <div className="flex ml-auto -mr-4 lg:hidden">
          <PrivyButton />
          <MobileMenuButton>
            <HamburgerIcon />
          </MobileMenuButton>
        </div>

        {/* DESKTOP BARTABS */}
        <div className="flex-col hidden mt-24 space-y-6 lg:flex">
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
};

export default Sidebar;

const TelegramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 32 32"
    className="w-6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.13634 16.5047C4.13634 16.5047 3.44417 16.3627 3.00208 15.8351C3.00208 15.8351 2.59976 15.355 2.54149 14.7213C2.54149 14.7213 2.48298 14.085 2.79381 13.5405C2.79381 13.5405 3.1362 12.9406 3.79673 12.6818L26.8758 3.61767C26.8758 3.61767 27.3919 3.41759 27.9374 3.51132C27.9374 3.51132 28.483 3.60506 28.9027 3.96593C28.9027 3.96593 29.3224 4.3268 29.4968 4.85211C29.4968 4.85211 29.6713 5.37741 29.5496 5.92326L24.8494 26.4488C24.8494 26.4488 24.731 26.9647 24.3729 27.3545C24.3729 27.3545 24.0148 27.7442 23.5107 27.9058C23.5107 27.9058 23.0067 28.0674 22.4887 27.9585C22.4887 27.9585 21.9707 27.8497 21.5767 27.5008L10.5403 17.7903L4.14046 16.5055L4.13634 16.5047ZM4.53411 14.5446L11.1966 15.8821C11.3687 15.9167 11.5286 15.9959 11.6604 16.1118L22.8979 25.9993L22.9001 26.0013L27.5988 5.48244L4.52784 14.5433L4.53411 14.5446Z"
      fill="#9CA3AF"
    />
    <path
      d="M28.5974 5.38585C28.8577 5.19784 29.0123 4.89605 29.0123 4.57495C29.0123 4.55946 29.0119 4.54396 29.0112 4.52848C29.0021 4.33432 28.9367 4.14701 28.8229 3.98944C28.6676 3.77444 28.4333 3.62993 28.1715 3.58771C28.1188 3.57922 28.0656 3.57495 28.0123 3.57495C28.0007 3.57495 27.9892 3.57515 27.9777 3.57555C27.7794 3.5824 27.5876 3.6481 27.4267 3.76429L10.4148 16.0514C10.1998 16.2067 10.0547 16.4414 10.0125 16.7032C10.004 16.7559 9.99976 16.8091 9.99976 16.8625C9.99976 16.874 9.99995 16.8855 10.0004 16.897C10.0072 17.0953 10.0729 17.2871 10.1891 17.448C10.3771 17.7083 10.6787 17.8625 10.9998 17.8625C11.0152 17.8625 11.0307 17.8621 11.0462 17.8614C11.2404 17.8523 11.4277 17.7869 11.5853 17.6731L28.5974 5.38585Z"
      fill="#9CA3AF"
    />
    <path
      d="M11.9998 24.9984V16.8625C11.9998 16.3103 11.552 15.8625 10.9998 15.8625C10.4475 15.8625 9.99976 16.3102 9.99976 16.8625V25C10.0008 25.61 10.3403 26.1148 10.3403 26.1148C10.6799 26.6195 11.243 26.8497 11.243 26.8497C11.8061 27.0799 12.402 26.9575 12.402 26.9575C12.9979 26.8352 13.4248 26.4017 13.4248 26.4017L17.3194 22.5072C17.5069 22.3196 17.6123 22.0653 17.6123 21.8C17.6123 21.5348 17.5069 21.2805 17.3194 21.0929C17.1318 20.9054 16.8775 20.8 16.6123 20.8C16.347 20.8 16.0927 20.9054 15.9051 21.0929L11.9998 24.9984Z"
      fill="#9CA3AF"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 32 32"
    className="w-6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0007 11.0005C16.0007 8.25045 18.3132 5.96295 21.0632 6.00045C22.0262 6.01157 22.9656 6.3006 23.7683 6.8328C24.571 7.365 25.203 8.11771 25.5882 9.00045H30.0007L25.9632 13.038C25.7026 17.0937 23.9073 20.8979 20.9422 23.6773C17.9771 26.4566 14.0648 28.0025 10.0007 28.0005C6.00068 28.0005 5.00068 26.5005 5.00068 26.5005C5.00068 26.5005 9.00068 25.0005 11.0007 22.0005C11.0007 22.0005 3.00068 18.0005 5.00068 7.00045C5.00068 7.00045 10.0007 12.0005 16.0007 13.0005V11.0005Z"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FarcasterIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    className="w-5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.11834 0H19.5976V24H17.3254V13.0065H17.3032C17.052 9.96809 14.71 7.5871 11.858 7.5871C9.00594 7.5871 6.66394 9.96809 6.41282 13.0065H6.39053V24H4.11834V0Z"
      fill="#9CA3AF"
    />
    <path
      d="M0 3.40645L0.923077 6.8129H1.70414V20.5935C1.31199 20.5935 0.994083 20.9402 0.994083 21.3677V22.2968H0.852071C0.459916 22.2968 0.142012 22.6434 0.142012 23.071V24H8.09467V23.071C8.09467 22.6434 7.77677 22.2968 7.38462 22.2968H7.2426V21.3677C7.2426 20.9402 6.9247 20.5935 6.53254 20.5935H5.68047V3.40645H0Z"
      fill="#9CA3AF"
    />
    <path
      d="M17.4675 20.5935C17.0753 20.5935 16.7574 20.9402 16.7574 21.3677V22.2968H16.6154C16.2232 22.2968 15.9053 22.6434 15.9053 23.071V24H23.858V23.071C23.858 22.6434 23.5401 22.2968 23.1479 22.2968H23.0059V21.3677C23.0059 20.9402 22.688 20.5935 22.2959 20.5935V6.8129H23.0769L24 3.40645H18.3195V20.5935H17.4675Z"
      fill="#9CA3AF"
    />
  </svg>
);
