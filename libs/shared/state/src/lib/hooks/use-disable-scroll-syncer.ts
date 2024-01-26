import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { mobileRightPanelOpenAtom } from '../atoms/mobile-right-panel-open-atom';

export const useDisableScrollSyncer = (value: boolean) => {
  const [currentValue, setCurrentValue] = useAtom(mobileRightPanelOpenAtom);

  useEffect(() => {
    if (currentValue !== value) {
      setCurrentValue(value);
    }
  }, [currentValue, setCurrentValue, value]);
};
