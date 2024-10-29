import React, { useCallback } from 'react';

import { PrimitiveAtom, useSetAtom } from 'jotai';

interface Props {
  children: React.ReactNode;
  isFocusedAtom: PrimitiveAtom<boolean>;
}

export const GridFocusWrapper = ({ children, isFocusedAtom }: Props) => {
  const setIsFocused = useSetAtom(isFocusedAtom);
  const onFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  const onBlur = useCallback(() => setIsFocused(false), [setIsFocused]);

  return (
    <div
      className="ag-theme-quartz w-full"
      style={{ height: 800 }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
};
