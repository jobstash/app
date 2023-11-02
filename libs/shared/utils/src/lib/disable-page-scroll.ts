const CLASS_TEXT = 'disable-scroll';

export const disablePageScroll = (isDisabled: boolean) => {
  const el = document.querySelectorAll('html')[0];

  isDisabled ? el.classList.add(CLASS_TEXT) : el.classList.remove(CLASS_TEXT);
};
