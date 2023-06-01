export const getAnalyticsId = (): string | undefined => {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return id;
};
