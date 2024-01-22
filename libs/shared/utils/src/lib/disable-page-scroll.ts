export const disablePageScroll = (isDisabled: boolean) => {
  const el = document.querySelectorAll('html')[0];
  el.style.overflowY = isDisabled ? 'hidden' : 'unset';
};
