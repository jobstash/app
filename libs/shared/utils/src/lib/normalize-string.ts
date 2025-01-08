import slugify from 'slugify'
import {transliterate} from 'transliteration'

export const normalizeString = (str: string | null | undefined): string => {
  if (str === null || str === undefined) return "";
  const transliterated = transliterate(str);
  const slug = slugify(transliterated, {
    lower: true,
    remove: /[!"'()*+.:@~]/g,
    strict: true,
  });
  if (slug === "") {
    return str.trim().toLowerCase();
  }

  return slug;
};