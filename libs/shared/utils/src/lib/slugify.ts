export const slugify = (str: string) =>
  str.replaceAll(/[\W_]+/g, '-').toLowerCase();
