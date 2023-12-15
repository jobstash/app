export const createFetchDeets = <P>(
  reqUrl: string,
  method: 'GET' | 'POST' | 'DELETE',
  payload?: P,
) => {
  let url = reqUrl;

  if (method === 'GET' && Boolean(payload)) {
    url +=
      '?' + new URLSearchParams(payload as unknown as Record<string, string>);
  }

  const body =
    method === 'POST' || method === 'DELETE'
      ? JSON.stringify(payload)
      : undefined;

  return { url, body };
};
