import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { LS_KEYS } from '@jobstash/shared/core';

import { getMwVersion } from '@jobstash/shared/data';

export const useMwVersion = () => {
  const [isReady, setIsReady] = useState(false);

  const { data: mwVersion } = useQuery({
    queryKey: ['mw-version'],
    queryFn: () => getMwVersion(),
  });

  useEffect(() => {
    if (mwVersion && typeof window !== 'undefined') {
      const clientVersion = localStorage.getItem(LS_KEYS.MW_VERSION);

      if (clientVersion === mwVersion) {
        setIsReady(true);
      } else {
        // Update client version
        localStorage.setItem(LS_KEYS.MW_VERSION, mwVersion);

        // Force reload page
        window.location.reload();
      }
    }
  }, [mwVersion]);

  return { mwVersion, isReady };
};
