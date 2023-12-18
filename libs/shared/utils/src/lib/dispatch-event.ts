export const dispatchEvent = (id: string) => {
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new Event(id));
  }
};
