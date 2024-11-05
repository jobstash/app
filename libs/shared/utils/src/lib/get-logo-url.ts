import { getGoogleLogoUrl } from './get-google-logo-url';
import { getWebsiteText } from './get-website-text';

const GOOGLE_FAVICON_SUBSTRING = 'www.google.com/s2/favicons';

export const getLogoUrl = (url: string | null, logo?: string | null) =>
  logo && logo.trim().length > 0
    ? logo.includes(GOOGLE_FAVICON_SUBSTRING)
      ? logo
      : `/api/image?logo=${getWebsiteText(logo).link}&url=${
          getWebsiteText(url).link
        }`
    : getGoogleLogoUrl(url);
