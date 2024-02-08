export const disablePageScroll = (shouldDisable: boolean) => {
  const el = document.querySelectorAll('html')[0];
  el.style.overflowY = shouldDisable ? 'hidden' : 'unset';
};
