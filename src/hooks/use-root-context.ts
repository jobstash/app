import { useContext } from 'react';

import { RootCtx } from '~/contexts/root-context';

export const useRootContext = () => useContext(RootCtx);
