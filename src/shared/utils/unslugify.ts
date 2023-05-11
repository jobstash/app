import { capitalize } from './capitalize';

export const unslugify = (slug: string) =>
  slug
    .split('-')
    .map((w) => capitalize(w))
    .join(' ');
