export const getPluralText = (text: string, length: number) =>
  `${text}${length > 1 ? 's' : ''}`;
