export const getUrlWithParams = (
  origin: string,
  path: string,
  params: Record<string, string>,
  shouldReturnString = true,
) => {
  const url = new URL(`${origin}${path}`);
  if (Object.keys(params).length > 0) {
    for (const [key, value] of Object.entries(params)) {
      if (key.startsWith('privy_')) {
        continue;
      }

      console.log({ key });

      url.searchParams.set(key, value);
    }
  }

  if (shouldReturnString) {
    return url.toString();
  }

  return url;
};
