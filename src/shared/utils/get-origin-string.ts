export const getOriginString = (origin?: string) =>
  process.env.NODE_ENV === 'production'
    ? origin ?? 'https://app.jobstash.xyz'
    : origin ?? 'https://localhost:3000';
