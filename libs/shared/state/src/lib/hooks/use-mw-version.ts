import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SESSION_STORAGE_KEYS } from '@jobstash/shared/core';

import { getMwVersion } from '@jobstash/shared/data';

export const useMwVersion = () => {
  const [isReady, setIsReady] = useState(false);

  const { data: mwVersion } = useQuery({
    queryKey: ['mw-version'],
    queryFn: () => getMwVersion(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: 1000 * 60 * 30, // 30 minutes
  });

  useEffect(() => {
    if (mwVersion && typeof window !== 'undefined') {
      const clientVersion = localStorage.getItem(
        SESSION_STORAGE_KEYS.MW_VERSION,
      );

      if (clientVersion === mwVersion) {
        setIsReady(true);
      } else {
        // Update client version
        localStorage.setItem(SESSION_STORAGE_KEYS.MW_VERSION, mwVersion);

        // Force reload page
        window.location.reload();
      }
    }
  }, [mwVersion]);

  return { mwVersion: isReady && mwVersion ? mwVersion : null, isReady };
};
