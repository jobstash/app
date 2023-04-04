import { Avatar as CkAvatar, ConnectKitButton } from 'connectkit';

import { Bartab } from '../base';

export const ConnectWalletButton = () => (
  <div style={{ minHeight: 40 }}>
    <ConnectKitButton.Custom>
      {({ address, show, isConnecting }) => (
        <Bartab
          variant="wallet"
          left={
            isConnecting ? null : (
              <CkAvatar address={address} name={address} size={24} />
            )
          }
          right={null}
          text={
            address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : isConnecting
              ? 'Connecting'
              : 'Connect Wallet'
          }
          onClick={() => (show ? show() : null)}
        />
      )}
    </ConnectKitButton.Custom>
  </div>
);
