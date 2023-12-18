import { memo } from 'react';

import { Avatar as CkAvatar, ConnectKitButton } from 'connectkit';

import { useIsMounted } from '@jobstash/shared/state';

import { Bartab } from '@jobstash/shared/ui';

const ConnectWalletButtonx = () => {
  const isMounted = useIsMounted();

  return (
    <div style={{ minHeight: 40 }}>
      {isMounted ? (
        <ConnectKitButton.Custom>
          {({ address, show, isConnected, ensName }) => (
            <Bartab
              isActive={false}
              variant="wallet"
              left={
                isConnected ? (
                  <CkAvatar address={address} name={address} size={24} />
                ) : null
              }
              onClick={() => (show ? show() : null)}
            >
              {address
                ? ensName ?? `${address.slice(0, 6)}...${address.slice(-4)}`
                : 'Connect Wallet'}
            </Bartab>
          )}
        </ConnectKitButton.Custom>
      ) : null}
    </div>
  );
};

export default memo(ConnectWalletButtonx);
