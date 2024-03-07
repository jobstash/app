export const createUrlWithSearchParams = (
  url: string,
  searchParams: string | Record<string, string>,
) => {
  if (typeof searchParams === 'string') {
    if (!searchParams) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${searchParams}`;
  }

  const result = new URL(url);

  const hasSearchParams =
    typeof searchParams === 'object' && Object.keys(searchParams).length > 0;

  if (hasSearchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      result.searchParams.set(k, v);
    }
  }

  return result.toString();
};
