import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAccount } from 'wagmi';

import { useIsMounted } from './use-is-mounted';

export const useDelayedAuthRender = ({
  requireConnected,
}: {
  requireConnected: boolean;
}) => {
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
