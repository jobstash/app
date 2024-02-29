import { memo, useEffect, useRef } from 'react';

import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

const WagmiSiweSync = () => {
  const { isConnected } = useAccount();
  const { isSignedIn, signOut } = useSIWE();

  const signOutRef = useRef(false);

  useEffect(() => {
    if (!isConnected && isSignedIn && !signOutRef.current) {
      signOutRef.current = true;
      signOut();
      window.location.href = '/jobs';
    }
  }, [isConnected, isSignedIn, signOut]);

  return null;
};

export default memo(WagmiSiweSync);
