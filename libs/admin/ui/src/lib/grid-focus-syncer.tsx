import { useEffect } from 'react';

import { PrimitiveAtom, useAtomValue } from 'jotai';

interface Props {
  pastaAtom: PrimitiveAtom<string>;
  focusAtom: PrimitiveAtom<boolean>;
}

export const GridFocusSyncer = ({ pastaAtom, focusAtom }: Props) => {
  const isFocused = useAtomValue(focusAtom);
  const pastaString = useAtomValue(pastaAtom);

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
