/* eslint-disable unicorn/no-array-reduce */
export const conditionalItem = <T>(includeItem: boolean, item: T) =>
  includeItem ? [item] : [];

export const conditionalItems = <T>(items: [boolean, T][]) =>
  items.reduce((acc, [includeItem, item]) => {
    if (includeItem) {
      acc.push(item);
    }

    return acc;
  }, [] as T[]);
