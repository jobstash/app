import { LS_KEYS } from '@jobstash/shared/core';

export const getLocalStorageValue = (lsKey: string) => {
  if (typeof window === 'undefined') return '';

  return localStorage.getItem(lsKey);
};

export const getLSMwVersion = () => getLocalStorageValue(LS_KEYS.MW_VERSION);
