import { Avatar as CkAvatar, ConnectKitButton } from 'connectkit';

import { useWalletAuthContext } from '~/features/auth/hooks';
import { useIsMounted } from '~/shared/hooks';

import { Bartab } from '../base';

export const ConnectWalletButton = () => {
  const isMounted = useIsMounted();
  const { role } = useWalletAuthContext();

  if (!isMounted)
    return <Bartab variant="wallet" text="Connect Wallet" isActive={false} />;

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
            right={null}
            text={
              address
                ? role === 'ADMIN'
                  ? 'ADMIN'
                  : `${address.slice(0, 6)}...${address.slice(-4)}`
                : 'Connect Wallet'
            }
            onClick={() => (show ? show() : null)}
          />
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};
