export const getCountText = (text: string, count: number) =>
  `${text}${count > 0 ? ` (${count})` : ''}`;
