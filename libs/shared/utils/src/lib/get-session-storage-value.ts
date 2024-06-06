import { SESSION_STORAGE_KEYS } from '@jobstash/shared/core';

export const getSessionStorageValue = (lsKey: string) => {
  if (typeof window === 'undefined') return '';

  return localStorage.getItem(lsKey);
};

export const getLSMwVersion = () =>
  getSessionStorageValue(SESSION_STORAGE_KEYS.MW_VERSION);
