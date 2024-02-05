export const getPluralText = (
  text: string | [string, string],
  count: number,
) => {
  const isPlural = count > 1;

  if (Array.isArray(text)) {
    return isPlural ? text[0] : text[1];
  }

  return `${text}${isPlural ? 's' : ''}`;
};
