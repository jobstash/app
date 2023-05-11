export const encodeBase64 = (data: string) =>
  typeof window === 'undefined' ? '' : window.btoa(data);

export const decodeBase64 = (data: string) =>
  typeof window === 'undefined' ? '' : window.atob(data);
