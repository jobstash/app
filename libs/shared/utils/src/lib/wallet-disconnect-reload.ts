const REDIRECT_PATH = '/';
const RELOAD_PATTERN = /^(\/jobs|\/organizations|\/projects)/;

export const walletDisconnectReload = (path: string) => {
  if (typeof window === 'undefined') return;

  const isReloadPath = RELOAD_PATTERN.test(path);

  if (isReloadPath) {
    window.location.reload();
  } else {
    window.location.href = REDIRECT_PATH;
  }
};
