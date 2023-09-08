import { getGoogleLogoUrl } from './get-google-logo-url';

export const getLogoUrl = (url: string, logo?: string | null) => {
  console.log(JSON.stringify({ url, logo }));

  return logo && logo.trim().length > 0
    ? `/api/image?logo=${logo}&url=${url}`
    : getGoogleLogoUrl(url);
};
