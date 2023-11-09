export const capitalize = (str: string, lowercase = false) => {
  if (!str) return '';

  const s1 = str.charAt(0).toUpperCase();
  const s2 = lowercase ? str.slice(1).toLowerCase() : str.slice(1);

  return s1 + s2;
};
