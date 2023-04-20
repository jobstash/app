export const getUrlWithFilters = (
  filterParamsObj: Record<string, string>,
  path: string,
  origin?: string,
) => {
  const base =
    process.env.NODE_ENV === 'production'
      ? origin ?? 'https://frontend.jobstash.xyz'
      : origin ?? 'https://localhost:3000';

  const url = new URL(`${base}${path}`);
  if (Object.keys(filterParamsObj).length > 0) {
    for (const [key, value] of Object.entries(filterParamsObj)) {
      url.searchParams.set(key, value);
    }
  }

  return url;
};
