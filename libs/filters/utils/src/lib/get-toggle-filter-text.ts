export const getToggleFilterText = (count: number) =>
  `Filters & Sorting${count > 0 ? ' (' + count + ')' : ''}`;
