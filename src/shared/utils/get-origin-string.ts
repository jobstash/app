export const getOriginString = (origin?: string) =>
  process.env.NODE_ENV === 'production'
    ? origin ?? 'https://frontend.jobstash.xyz'
    : origin ?? 'https://localhost:3000';
