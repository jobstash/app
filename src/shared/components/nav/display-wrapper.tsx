'use client';

import { useAtomValue } from 'jotai';

import { showFullscreenNavAtom } from '~/shared/atoms/show-fullscreen-nav-atom';

interface Props {
  children: React.ReactNode;
}

export const DisplayWrapper = ({ children }: Props) => {
  const isDisplayed = useAtomValue(showFullscreenNavAtom);

  return isDisplayed ? children : null;
};
