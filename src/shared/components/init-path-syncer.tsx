'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { initPathAtom } from '~/shared/atoms/init-path-atom';

export const InitPathSyncer = () => {
  const pathname = usePathname();
  const [initPath, setInitPath] = useAtom(initPathAtom);

  useEffect(() => {
    if (!initPath) {
      setInitPath(pathname);
    }
  }, [initPath, pathname, setInitPath]);

  return null;
};
