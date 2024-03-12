export const omit = <T extends object>(
  obj: T,
  omitKeys: keyof T | (keyof T)[],
) => {
  const keysToOmit = Array.isArray(omitKeys) ? omitKeys : [omitKeys];

  return Object.keys(obj).reduce((result: Partial<T>, key: string) => {
    if (!keysToOmit.includes(key as keyof T)) {
      result[key as keyof T] = obj[key as keyof T];
    }
    return result;
  }, {});
};
