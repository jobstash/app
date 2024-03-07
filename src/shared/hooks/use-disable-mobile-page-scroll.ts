import { useSetAtom } from 'jotai';

import { isDisabledPageScrollAtom } from '~/shared/atoms/is-disabled-page-scroll-atom';

import { useIsDesktop } from './use-media-query';

export const useDisableMobilePageScroll = () => {
  const isDesktop = useIsDesktop();
  const setIsDisabled = useSetAtom(isDisabledPageScrollAtom);

  const setMobileValue = (value: boolean) => {
    if (!isDesktop) setIsDisabled(value);
  };

  const disableMobilePageScroll = () => setMobileValue(true);
  const enableMobilePageScroll = () => setMobileValue(false);

  return { disableMobilePageScroll, enableMobilePageScroll };
};
