type AnyObject = { [key: string]: any };

/**
 * Removes specified properties from an object.
 *
 * @param obj - The object to remove properties from.
 * @param keys - The array of keys to be removed from the object.
 * @returns A new object without the specified properties.
 */
export const removeObjectProps = <T extends AnyObject>(
  obj: T,
  keys: string[],
): Partial<T> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }

  return result;
};
