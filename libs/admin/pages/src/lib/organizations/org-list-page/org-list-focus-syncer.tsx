import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import {
  orgListIsFocusedAtom,
  orgListPastaStringAtom,
} from '@jobstash/admin/state';

export const OrgListFocusSyncer = () => {
  const isFocused = useAtomValue(orgListIsFocusedAtom);
  const pastaString = useAtomValue(orgListPastaStringAtom);

  useEffect(() => {
    const handleCopy = () => {
      if (typeof navigator !== 'undefined' && isFocused) {
        const text = pastaString || window.getSelection()?.toString() || '';
        navigator.clipboard.writeText(text);
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [isFocused, pastaString]);

  return null;
};
