import { createContext } from 'react';

import { MwVersionCtx } from '@jobstash/shared/core';

export const MwVersionContext = createContext<MwVersionCtx>({
  isReady: false,
  mwVersion: null,
});
