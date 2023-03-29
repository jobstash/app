import { Avatar as CkAvatar, ConnectKitButton } from 'connectkit';

import { Bartab, Text } from '../base';

export const ConnectWalletButton = () => (
  <div style={{ minHeight: 40 }}>
    <ConnectKitButton.Custom>
      {({ address, show, isConnecting }) => (
        <Bartab
          isConnected
          intent="wallet"
          left={<CkAvatar address={address} name="pakyu" size={24} />}
          text={
            address ? (
              <div className="flex items-center gap-x-2">
                <Text size="sm" fw="bold">
                  {`${address.slice(0, 6)}...${address.slice(-4)}`}
                </Text>
              </div>
            ) : isConnecting ? (
              'Connecting'
            ) : (
              'Connect Wallet'
            )
          }
          onClick={() => (show ? show() : null)}
        />
      )}
    </ConnectKitButton.Custom>
  </div>
);
