export const checkJobIsFeatured = (
  startDate: number | null,
  endDate: number | null,
) => {
  const validStart = startDate ? Date.now() > startDate : false;
  const validEnd = endDate ? Date.now() < (endDate ?? 0) : false;
  return validStart && validEnd;
};
