export const getTableTabCountText = (prefix: string, count?: number) =>
  `${prefix}${
    typeof count === 'number' && Boolean(count) ? ` (${count})` : ''
  }`;
