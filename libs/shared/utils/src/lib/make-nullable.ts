export const makeNullable = <T>(value: T) =>
  typeof value !== 'boolean' && !value ? null : value;
