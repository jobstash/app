export const getLocalStorageValue = (lsKey: string) => {
  if (typeof window === 'undefined') return '';

  return localStorage.getItem(lsKey);
};

export const getSessionStorageValue = (lsKey: string) => {
  if (typeof window === 'undefined') return '';

  return sessionStorage.getItem(lsKey);
};
