import { getGoogleLogoUrl } from './get-google-logo-url';

export const getLogoUrl = (url: string, logo?: string | null) =>
  logo && logo.trim().length > 0
    ? `/api/image?logo=${logo}&url=${url}`
    : getGoogleLogoUrl(url);
