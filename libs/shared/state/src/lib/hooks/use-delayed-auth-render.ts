import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAccount } from 'wagmi';

import { useIsMounted } from './use-is-mounted';

interface Params {
  requireConnected?: boolean;
}

export const useDelayedAuthRender = (params?: Params) => {
  const { requireConnected = true } = params ?? {};

  const isMounted = useIsMounted();
  const { push } = useRouter();
  const { isConnected } = useAccount();

  const [canRender, setCanRender] = useState(false);

  // Reference to avoid spamming loading spinner
  const hasRendered = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isConnected) {
        return push('/');
      }

      const connectFlag = requireConnected ? isConnected : true;

      setCanRender(connectFlag && isMounted);

      if (!hasRendered.current) {
        hasRendered.current = true;
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [isConnected, isMounted, push, requireConnected]);

  return { canRender: canRender || hasRendered.current };
};
