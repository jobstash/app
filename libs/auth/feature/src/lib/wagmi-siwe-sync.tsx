import { useRouter } from 'next/router';
import { memo, useEffect, useRef } from 'react';

import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { walletDisconnectReload } from '@jobstash/shared/utils';

const WagmiSiweSync = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { isSignedIn, signOut } = useSIWE();

  const signOutRef = useRef(false);

  useEffect(() => {
    if (!isConnected && isSignedIn && !signOutRef.current) {
      signOutRef.current = true;
      signOut();

      walletDisconnectReload(router.asPath);
    }
  }, [isConnected, isSignedIn, router.asPath, signOut]);

  return null;
};

export default memo(WagmiSiweSync);
