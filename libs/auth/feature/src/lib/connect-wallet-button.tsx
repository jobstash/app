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

import { cn } from '@jobstash/shared/utils';

import { useIsMounted } from '@jobstash/shared/state';

import { Bartab } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}

const ConnectWalletButton = ({ isMobile }: Props) => {
  const isMounted = useIsMounted();
  const { isSignedIn } = useSIWE();

  return (
    <div style={{ minHeight: 40, position: 'relative' }}>
      {isMounted ? (
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
                      <div className="flex items-center gap-4 md:gap-2 text-white text-xl">
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
                  <div className="px-2 py-1 flex flex-col gap-0 text-white text-sm">
                    <span className="">
                      You&#39;re not signed in to this app.
                    </span>
                    <span>
                      <span className="font-bold mr-1">
                        Sign In With Ethereum
                      </span>
                      to continue.
                    </span>
                  </div>
                }
                disabled={!(isConnected && !isSignedIn)}
                classNames={{
                  tooltip: 'bg-[#1A88F8] rounded-xl',
                  arrow: 'bg-[#1A88F8]',
                }}
                arrowSize={12}
                portalProps={{
                  className: 'bg-red-50',
                }}
              >
                <Bartab
                  isActive={false}
                  variant="wallet"
                  left={
                    <div className="flex items-center gap-2">
                      <SiweAvatar isSignedIn={isSignedIn} />
                      <CkAvatar address={address} name={address} size={24} />
                    </div>
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
