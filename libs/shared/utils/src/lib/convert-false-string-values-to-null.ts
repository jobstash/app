/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertFalseStringValuesToNull = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (!value) {
        obj[key] = null;
      } else if (typeof value === 'object') {
        obj[key] = convertFalseStringValuesToNull(value);
      }
    }
  }

  return obj;
};
