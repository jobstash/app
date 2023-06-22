import { ParsedUrlQuery } from 'node:querystring';

export const createFilterParamsObj = (
  query: ParsedUrlQuery,
  whiteListSet: Set<string>,
) => {
  const filterParamsObj: Record<string, string> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value && !whiteListSet.has(key)) {
      filterParamsObj[key] = value.toString();
    }
  }

  return filterParamsObj;
};
