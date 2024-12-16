import slugify from 'slugify';

export const normalizeString = (original: string) =>
  slugify(original, { lower: true });
