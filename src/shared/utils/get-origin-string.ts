import { NEXT_PUBLIC_FRONTEND_URL } from '../core/constants';

export const getOriginString = (origin?: string) =>
  process.env.NODE_ENV === 'production'
    ? origin ?? NEXT_PUBLIC_FRONTEND_URL
    : origin ?? 'https://localhost:3000';
