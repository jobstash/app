export const getUrlWithParams = (
  origin: string,
  path: string,
  params: Record<string, string>,
) => {
  const url = new URL(`${origin}${path}`);
  if (Object.keys(params).length > 0) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
};