import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { isDisabledPageScrollAtom } from '../atoms/is-disabled-page-scroll-atom';

import { useIsMounted } from './use-is-mounted';
import { useIsDesktop } from './use-media-query';

export const useMobileDisableScrollSyncer = ({
  shouldDisable,
}: {
  shouldDisable: boolean;
}) => {
  const isMounted = useIsMounted();
  const isDesktop = useIsDesktop();
  const [isDisabled, setIsDisabled] = useAtom(isDisabledPageScrollAtom);

  useEffect(() => {
    if (isMounted && !isDesktop && isDisabled !== shouldDisable) {
      setIsDisabled(shouldDisable);
    }
  }, [isDesktop, isDisabled, isMounted, setIsDisabled, shouldDisable]);
};
