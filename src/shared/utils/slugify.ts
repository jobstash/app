/** Slugify just transforms input into a url-friendly string */
export const slugify = (str: string) =>
  str.replace(/[\W_]+/g, '-').toLowerCase();
