import { useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { orgListIsFocusedAtom } from '@jobstash/admin/state';

interface Props {
  children: React.ReactNode;
}

export const OrgListTableWrapper = ({ children }: Props) => {
  const setIsFocused = useSetAtom(orgListIsFocusedAtom);
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
