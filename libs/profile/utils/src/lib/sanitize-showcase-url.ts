export const sanitizeShowcaseUrl = (url: string) =>
  url.startsWith('http') ? url : `https://${url}`;
