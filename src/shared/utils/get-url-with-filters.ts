import { getOriginString } from './get-origin-string';

export const getUrlWithFilters = (
  filterParamsObj: Record<string, string>,
  path: string,
  origin?: string,
) => {
  const base = getOriginString(origin);

  const url = new URL(`${base}${path}`);
  if (Object.keys(filterParamsObj).length > 0) {
    for (const [key, value] of Object.entries(filterParamsObj)) {
      url.searchParams.set(key, value);
    }
  }

  return url;
};
