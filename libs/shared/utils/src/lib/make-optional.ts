export const makeOptional = <T>(value: T) =>
  value === null ? undefined : value;
