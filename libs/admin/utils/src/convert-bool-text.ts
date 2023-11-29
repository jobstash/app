export const convertBoolText = (value: string | boolean | null) => {
  if (typeof value === 'boolean') return value;

  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }

  return null;
};
