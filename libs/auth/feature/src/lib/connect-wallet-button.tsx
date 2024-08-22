import { memo } from 'react';

import { CheckIcon } from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mantine/core';
import { Badge } from '@nextui-org/react';
import {
  Avatar,
  Avatar as CkAvatar,
  ConnectKitButton,
  useSIWE,
} from 'connectkit';
import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import {
  isOpenTopBannerAtom,
  useIsMounted,
  useMwVersionContext,
} from '@jobstash/shared/state';

import { Bartab } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
  isHeaderMobile?: boolean;
}

const ConnectWalletButton = ({ isMobile, isHeaderMobile }: Props) => {
  const { isReady } = useMwVersionContext();
  const isMounted = useIsMounted();
  const { isSignedIn } = useSIWE();
  const isOpen = useAtomValue(isOpenTopBannerAtom);

  const showButton = isMounted && isReady;

  return (
    <div style={{ minHeight: '40px', position: 'relative' }}>
      {showButton ? (
        <ConnectKitButton.Custom>
          {({ address, show, isConnected, ensName, truncatedAddress }) => {
            const displayName = ensName ?? truncatedAddress;
            const onClick = () => (show ? show() : null);

            if (isMobile) {
              const btnClassName = cn(
                'flex h-14 w-full max-w-md items-center justify-center rounded-xl hover:brightness-110',
                {
                  'h-14 w-full items-center  justify-center rounded-lg bg-gradient-to-r from-[#8743FF] to-[#D68800] p-0.5':
                    isSignedIn,
                },
              );

              const btnStyle = isSignedIn
                ? undefined
                : {
                    background:
                      'linear-gradient(90deg, #4637F2, #8242FE) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
                    border: '4px solid transparent',
                  };

              const innerClassName = cn(
                'flex h-full w-full items-center justify-center text-lg font-semibold',
                {
                  'flex h-full w-full items-center justify-center rounded-lg bg-transparent text-lg font-semibold transition-all duration-300 hover:bg-dark-gray hover:brightness-110':
                    isSignedIn,
                },
              );

              return (
                <div className="flex min-h-[40px] w-full justify-center pt-4">
                  <button
                    type="button"
                    className={btnClassName}
                    style={btnStyle}
                    onClick={onClick}
                  >
                    <div className={innerClassName}>
                      <div className="flex items-center gap-4 text-xl text-white md:gap-2">
                        {isConnected ? (
                          isSignedIn ? (
                            <Avatar
                              address={address}
                              name={displayName}
                              size={28}
                            />
                          ) : (
                            <SiweAvatar isSignedIn={isSignedIn} />
                          )
                        ) : null}

                        {displayName ?? 'Connect Wallet'}
                      </div>
                    </div>
                  </button>
                </div>
              );
            }

            if (isHeaderMobile) {
              const btnClassName = cn(
                'flex w-full max-w-md items-center justify-center rounded-lg hover:brightness-110',
                {
                  'w-full items-center  justify-center rounded-md bg-gradient-to-r from-[#8743FF] to-[#D68800] p-0.5':
                    isSignedIn,
                },
              );

              const btnStyle = isSignedIn
                ? undefined
                : {
                    background:
                      'linear-gradient(0deg, #1E1E1E, #1E1E1E) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
                    border: '2px solid transparent',
                  };

              const innerClassName = cn(
                'flex h-full w-full items-center justify-center text-sm font-semibold',
                {
                  'flex h-full w-full items-center justify-center rounded-md bg-transparent text-sm font-semibold transition-all duration-300 hover:bg-dark-gray hover:brightness-110':
                    isSignedIn,
                },
              );

              return (
                <div className="flex justify-center w-full md:-mt-1">
                  <button
                    type="button"
                    className={btnClassName}
                    style={btnStyle}
                    onClick={onClick}
                  >
                    <div className={innerClassName}>
                      <div className="flex items-center gap-1 py-1 px-2 md:py-1.5 md:px-3 text-sm text-white md:gap-2 [&>div]:w-5 [&>div]:h-5 [&_svg]:w-4 [&_svg]:h-5">
                        {isConnected ? (
                          isSignedIn ? (
                            <Avatar
                              address={address}
                              name={displayName}
                              size={28}
                            />
                          ) : (
                            <SiweAvatar isSignedIn={isSignedIn} />
                          )
                        ) : null}

                        {displayName ?? 'Connect Wallet'}
                      </div>
                    </div>
                  </button>
                </div>
              );
            }

            return (
              <Tooltip
                withArrow
                withinPortal
                opened={isConnected && !isSignedIn}
                label={
                  <div className="flex flex-col gap-0 px-2 py-1 text-sm text-white">
                    <span className="">
                      You&#39;re not signed in to this app.
                    </span>
                    <span>
                      <span className="mr-1 font-bold">
                        Sign In With Ethereum
                      </span>
                      to continuexxx.
                    </span>
                  </div>
                }
                disabled={!(isConnected && !isSignedIn)}
                classNames={{
                  tooltip: cn(
                    'bg-[#1A88F8] rounded-xl !left-auto !right-[12px]',
                    {
                      '!fixed !top-[120px] sm:!top-[100px] lg:!top-[5px]':
                        isOpen,
                      '!top-[60px] lg:!top-[85px]': !isOpen,
                    },
                  ),
                  arrow: 'bg-[#1A88F8] !left-auto !right-[62px] ',
                }}
                arrowSize={12}
                portalProps={{
                  className: '',
                }}
              >
                <Bartab
                  isActive={false}
                  variant="wallet"
                  left={
                    address ? (
                      <div className="flex items-center gap-2">
                        <SiweAvatar isSignedIn={isSignedIn} />
                        <CkAvatar address={address} name={address} size={24} />
                      </div>
                    ) : undefined
                  }
                  onClick={onClick}
                >
                  {address
                    ? ensName ?? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : 'Connect Wallet'}
                </Bartab>
              </Tooltip>
            );
          }}
        </ConnectKitButton.Custom>
      ) : null}
    </div>
  );
};

export default memo(ConnectWalletButton);

interface SiweAvatarProps {
  isSignedIn: boolean;
}
const SiweAvatar = ({ isSignedIn }: SiweAvatarProps) => (
  <Badge
    content={
      isSignedIn ? (
        <div className="bg-[#64C365] rounded-full">
          <CheckIcon className="w-2.5 h-2.5 stroke-white fill-white" />
        </div>
      ) : (
        ''
      )
    }
    color="success"
    shape="circle"
    placement={isSignedIn ? 'bottom-right' : 'top-right'}
    classNames={{
      badge: cn('bg-[#1A88F8] mt-[3px] mr-0.5 h-2 w-2', {
        'bg-transparent h-5 w-5 mb-0.5 mr-0': isSignedIn,
      }),
    }}
    showOutline={false}
  >
    <UserCircleIcon className="w-9 md:w-6 h-9 md:h-6" />
  </Badge>
);
