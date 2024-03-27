export const checkSearchFilterValue = (
  searchValue: string,
  ...values: (string | null)[]
) => {
  const searchString = searchValue.toLowerCase();
  return values.some((value) => value?.toLowerCase().includes(searchString));
};
