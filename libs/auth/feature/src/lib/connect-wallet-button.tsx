import { memo } from 'react';

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
    <div style={{ minHeight: 40 }}>
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
                        {address && (
                          <Avatar
                            address={address}
                            name={displayName}
                            size={28}
                          />
                        )}

                        {displayName ?? 'Connect Wallet'}
                      </div>
                    </div>
                  </button>
                </div>
              );
            }

            return (
              <Bartab
                isActive={false}
                variant="wallet"
                left={
                  isConnected ? (
                    <CkAvatar address={address} name={address} size={24} />
                  ) : null
                }
                onClick={onClick}
              >
                {address
                  ? ensName ?? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : 'Connect Wallet'}
              </Bartab>
            );
          }}
        </ConnectKitButton.Custom>
      ) : null}
    </div>
  );
};

export default memo(ConnectWalletButton);
