type SortableTag = { id: string };

export const tagSortFn = (a: SortableTag, b: SortableTag) => {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
};
