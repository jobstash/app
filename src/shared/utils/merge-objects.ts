type PartialObject<T> = {
  [K in keyof T]?: T[K];
};

export const mergeObjects = <T>(obj1: T, obj2: PartialObject<T>): T =>
  Object.assign(
    {},
    obj1,
    ...Object.entries(obj2)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => ({ [key]: value })),
  );
