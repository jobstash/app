import { useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { orgListIsFocusedAtom } from '@jobstash/admin/state';

interface Props {
  children: React.ReactNode;
}

export const TableWrapper = ({ children }: Props) => {
  const setIsFocused = useSetAtom(orgListIsFocusedAtom);
  const onFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  const onBlur = useCallback(() => setIsFocused(false), [setIsFocused]);

  return (
    <div
      className="ag-theme-quartz w-full px-12"
      style={{ height: 800 }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
};
