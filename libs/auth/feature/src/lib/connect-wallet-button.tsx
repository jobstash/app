import { memo } from 'react';

import { Avatar as CkAvatar, ConnectKitButton, useIsMounted } from 'connectkit';

import { Bartab } from '@jobstash/shared/ui';

const ConnectWalletButtonx = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <Bartab variant="wallet" isActive={false}>
        Connect Wallet
      </Bartab>
    );
  }

  return (
    <div style={{ minHeight: 40 }}>
      <ConnectKitButton.Custom>
        {({ address, show, isConnected }) => (
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
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Connect Wallet'}
          </Bartab>
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default memo(ConnectWalletButtonx);
