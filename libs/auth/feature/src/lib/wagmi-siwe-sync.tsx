import { memo, useEffect } from 'react';

import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

const WagmiSiweSync = () => {
  const { isConnected } = useAccount();
  const { isSignedIn, signOut } = useSIWE();

  useEffect(() => {
    const siweSignOut = async () => {
      await signOut();
    };

    if (!isConnected && isSignedIn) {
      siweSignOut();
    }
  }, [isConnected, isSignedIn, signOut]);

  return null;
};

export default memo(WagmiSiweSync);
