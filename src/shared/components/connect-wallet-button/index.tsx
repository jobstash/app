'use client';

import { Avatar, ConnectKitButton, useSIWE } from 'connectkit';

import { CustomButton } from './custom-button';

export const ConnectWalletButton = () => {
  const { isSignedIn } = useSIWE();

  return (
    <ConnectKitButton.Custom>
      {({
        isConnecting,
        isConnected,
        address,
        truncatedAddress,
        ensName,
        show,
      }) => {
        const displayName = ensName ?? truncatedAddress;
        const onClick = () => (show ? show() : null);
        const isActive = isConnected && isSignedIn;

        return (
          <CustomButton
            isLoading={isConnecting}
            isActive={isActive}
            onClick={onClick}
          >
            <div className="flex items-center gap-4 md:gap-2">
              {address && (
                <Avatar address={address} name={displayName} size={28} />
              )}

              {displayName ?? 'Connect Wallet'}
            </div>
          </CustomButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
