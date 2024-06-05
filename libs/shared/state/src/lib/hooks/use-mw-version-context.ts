import { useContext } from 'react';

import { MwVersionContext } from '../contexts/mw-version-context';

export const useMwVersionContext = () => useContext(MwVersionContext);
