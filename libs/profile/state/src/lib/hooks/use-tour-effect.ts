import { useEffect } from 'react';

import { useTour } from '@reactour/tour';

import { LS_KEYS } from '@jobstash/profile/core';

type TourKeys = typeof LS_KEYS['TOURS'];
type LocalStorageKey = TourKeys[keyof TourKeys];

/**
 *
 * @param key used for localStorage
 * @param boolArg computed boolean value checked along localStorage value
 */
export const useTourEffect = (key: LocalStorageKey, boolArg: boolean) => {
  const { isOpen, setIsOpen } = useTour();
  const localStorageValue = initFromLocalStorage(key);

  const isOnboarding = !localStorageValue && boolArg;

  useEffect(() => {
    if (!isOpen && isOnboarding) {
      setIsOpen(isOnboarding);
    }
  }, [isOnboarding, isOpen, setIsOpen]);
};

const initFromLocalStorage = (key: LocalStorageKey): boolean => {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  return Boolean(localStorage.getItem(key));
};
