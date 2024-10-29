export const prefixUrl = (
  handle: string | string[] | null,
  prefix = '',
): string => {
  if (!handle) return '';
  if (Array.isArray(handle)) {
    return handle.map((h) => getPrefixUrl(h, prefix)).join(',');
  }

  return getPrefixUrl(handle, prefix);
};

const getPrefixUrl = (handle: string, prefix = '') => {
  const isPrefixed = handle.startsWith('http');

  if (isPrefixed) {
    return handle;
  }

  const normalizedPrefix = prefix.startsWith('http')
    ? prefix
    : `https://${prefix}`;
  const separator = prefix ? '/' : '';

  return `${normalizedPrefix}${separator}${handle}`;
};
