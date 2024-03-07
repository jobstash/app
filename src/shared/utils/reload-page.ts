export const reloadPage = (href?: string) => {
  if (typeof window !== 'undefined') {
    href ? (window.location.href = href) : window.location.reload();
  }
};
